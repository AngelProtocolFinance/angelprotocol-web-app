import { useFormContext } from "react-hook-form";
import {
  EndowmentProfileUpdateMeta,
  ProfileWithSettings,
} from "pages/Admin/types";
import { ProfileFormValues } from "pages/Admin/types";
import { ObjectEntries } from "types/utils";
import { useAdminResources } from "pages/Admin/Guard";
import { invalidateJunoTags } from "services/juno";
import { adminTags, junoTags } from "services/juno/tags";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Popup from "components/Popup";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import Account from "contracts/Account";
import CW3 from "contracts/CW3";
import { uploadToIpfs } from "helpers";
import { cleanObject, genDiffMeta, getPayloadDiff } from "helpers/admin";

// import optimizeImage from "./optimizeImage";

const PLACEHOLDER_OVERVIEW = "[text]";
const PLACEHOLDER_IMAGE = "[img]";

export default function useEditProfile() {
  const { endowmentId, cw3, proposalLink } = useAdminResources();
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useFormContext<ProfileFormValues>();
  const { wallet } = useGetWallet();
  const dispatch = useSetter();
  const { showModal } = useModalContext();
  const { handleError } = useErrorContext();

  const editProfile = async ({
    title,
    description,
    initial,
    ...data
  }: ProfileFormValues) => {
    try {
      //extract [code]
      if (data.country_of_origin) {
        data.country_of_origin = data.country_of_origin.split(" ")[0];
      }
      const diff = getPayloadDiff(initial, data);

      //if overview has changed, and is set to something
      if ("overview" in diff && data.overview) {
        //truncate to reduce proposalMsg size
        diff.overview = PLACEHOLDER_OVERVIEW;
        if (initial.image) {
          initial.overview = PLACEHOLDER_OVERVIEW;
        }
      }

      //if image has changed, and is set to something
      if ("image" in diff && data.image) {
        //truncate to reduce proposalMsg size
        diff.image = PLACEHOLDER_IMAGE;
        if (initial.image) {
          initial.image = PLACEHOLDER_IMAGE;
        }
      }

      const diffEntries = Object.entries(
        diff
      ) as ObjectEntries<ProfileWithSettings>;
      if (diffEntries.length <= 0) {
        throw new Error("no changes detected");
      }

      //run form change check first
      //upload if image is changed and is set to something
      if ("image" in diff && data.image) {
        //convert dataURL to file
        showModal(Popup, { message: "Uploading image.." });
        const imageRes = await fetch(data.image);
        const imageBlob = await imageRes.blob();
        const imageFile = new File([imageBlob], "banner"); //use endow address as unique imageName

        //TODO: investigate optimizeImage file.name = undefined
        // const file = await optimizeImage(imageFile);
        const url = await uploadToIpfs(imageFile);

        if (url) {
          data.image = url;
        } else {
          throw new Error("Error uploading image");
        }
      }

      const accountContract = new Account(wallet);
      const { sdgNum, name, logo, image, ...profilePayload } = data;
      const profileUpdateMsg = accountContract.createEmbeddedUpdateProfileMsg(
        //don't pass just diff here, old value should be included for null will be set if it's not present in payload
        cleanObject({
          ...profilePayload,
        })
      );

      const settingsUpdateMsg =
        accountContract.createEmbeddedUpdateSetttingsMsg(
          cleanObject({
            id: profilePayload.id,
            name,
            image,
            logo,
            categories: { sdgs: [sdgNum], general: [] },
          })
        );

      const profileUpdateMeta: EndowmentProfileUpdateMeta = {
        type: "acc_profile",
        data: genDiffMeta(diffEntries, initial),
      };

      const adminContract = new CW3(wallet, cw3);
      const proposalMsg = adminContract.createProposalMsg(
        title,
        description,
        [profileUpdateMsg, settingsUpdateMsg],
        JSON.stringify(profileUpdateMeta)
      );

      dispatch(
        sendCosmosTx({
          wallet,
          msgs: [proposalMsg],
          tagPayloads: [
            invalidateJunoTags([
              { type: junoTags.admin, id: adminTags.proposals },
            ]),
          ],
          successLink: proposalLink,
          successMessage: "Profile update proposal submitted",
        })
      );
      showModal(TransactionPrompt, {});
    } catch (err) {
      handleError(err);
    }
  };

  return {
    editProfile: handleSubmit(editProfile),
    isSubmitDisabled: isSubmitting || !isDirty,
    id: endowmentId,
  };
}
