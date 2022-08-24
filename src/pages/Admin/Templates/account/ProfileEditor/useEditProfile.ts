import { useFormContext } from "react-hook-form";
import { EndowmentProfileUpdateMeta } from "pages/Admin/types";
import { UpdateProfileValues } from "pages/Admin/types";
import { UpdateProfilePayload as UP } from "types/server/contracts";
import { ObjectEntries } from "types/utils";
import { useAdminResources } from "pages/Admin/Guard";
import { invalidateJunoTags } from "services/juno";
import { adminTags, junoTags } from "services/juno/tags";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
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
  const { endowmentId, cw3, proposalLink, chain } = useAdminResources();
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useFormContext<UpdateProfileValues>();
  const dispatch = useSetter();
  const { showModal } = useModalContext();
  const { handleError } = useErrorContext();

  const editProfile = async ({
    title,
    description,
    initialProfile,
    ...data
  }: UpdateProfileValues) => {
    try {
      //extract [code]
      if (data.country_of_origin) {
        data.country_of_origin = data.country_of_origin.split(" ")[0];
      }
      const diff = getPayloadDiff(initialProfile, data);

      //if overview has changed, and is set to something
      if ("overview" in diff && data.overview) {
        //truncate to reduce proposalMsg size
        diff.overview = PLACEHOLDER_OVERVIEW;
        if (initialProfile.image) {
          initialProfile.overview = PLACEHOLDER_OVERVIEW;
        }
      }

      //if image has changed, and is set to something
      if ("image" in diff && data.image) {
        //truncate to reduce proposalMsg size
        diff.image = PLACEHOLDER_IMAGE;
        if (initialProfile.image) {
          initialProfile.image = PLACEHOLDER_IMAGE;
        }
      }

      const diffEntries = Object.entries(diff) as ObjectEntries<UP>;
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
        const url = await uploadToIpfs(`endowment_${endowmentId}`, imageFile);

        if (url) {
          data.image = url;
        } else {
          throw new Error("Error uploading image");
        }
      }

      const accountContract = new Account(chain);
      const profileUpdateMsg = accountContract.createEmbeddedUpdateProfileMsg(
        //don't pass just diff here, old value should be included for null will be set if it's not present in payload
        cleanObject(data)
      );

      const profileUpdateMeta: EndowmentProfileUpdateMeta = {
        type: "acc_profile",
        data: genDiffMeta(diffEntries, initialProfile),
      };

      const adminContract = new CW3(chain, cw3);
      const proposalMsg = adminContract.createProposalMsg(
        title,
        description,
        [profileUpdateMsg],
        JSON.stringify(profileUpdateMeta)
      );

      dispatch(
        sendCosmosTx({
          chain,
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
  };
}
