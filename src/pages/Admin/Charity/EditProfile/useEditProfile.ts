import { useFormContext } from "react-hook-form";
import {
  EndowmentProfileUpdateMeta,
  FlatProfileWithSettings,
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

export default function useEditProfile() {
  const { endowmentId, cw3, proposal } = useAdminResources();
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

      //flatten profile values for diffing
      //TODO: refactor to diff nested objects
      const flatData: FlatProfileWithSettings = {
        ...data,
        image: data.image.preview,
        logo: data.logo.preview,
      };

      const diff = getPayloadDiff(initial, flatData);

      //if overview has changed, and is set to something
      if ("overview" in diff && data.overview) {
        //truncate to reduce proposalMsg size
        diff.overview = PLACEHOLDER_OVERVIEW;
      }

      const diffEntries = Object.entries(
        diff
      ) as ObjectEntries<FlatProfileWithSettings>;
      if (diffEntries.length <= 0) {
        throw new Error("no changes detected");
      }

      let imgUrl: string = "";
      //means new image file is selected
      if (data.image.file) {
        showModal(Popup, { message: "Uploading image.." });
        //TODO: make ipfs upload acces file[]
        imgUrl = await uploadToIpfs(data.image.file);
      } else {
        imgUrl = data.image.publicUrl;
      }
      //TODO: add logo upload

      const accountContract = new Account(wallet);
      const { sdg, name, ...profilePayload } = data;
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
            image: imgUrl,
            logo: data.logo.publicUrl,
            categories: { sdgs: [sdg], general: [] },
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
          ...proposal("Profile update"),
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
