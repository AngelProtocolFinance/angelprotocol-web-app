import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { EndowmentProfileUpdateMeta } from "pages/Admin/types";
import {
  EndowmentAdminParams,
  UpdateProfileValues,
} from "pages/EndowmentAdmin/types";
import { UpdateProfilePayload as UP } from "types/server/contracts";
import { ObjectEntries } from "types/utils";
import genDiffMeta from "pages/Admin/Templates/genDiffMeta";
import genProposalsLink from "pages/Admin/Templates/genProposalsLink";
import { uploadToIpfs } from "pages/Registration/helpers";
import { invalidateJunoTags } from "services/juno";
import { adminTags, junoTags } from "services/juno/tags";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Popup from "components/Popup";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors/sendCosmosTx";
import Account from "contracts/Account";
import Admin from "contracts/Admin";
import cleanObject from "helpers/cleanObject";
import getPayloadDiff from "helpers/getPayloadDiff";
import optimizeImage from "helpers/optimizeImage";

const PLACEHOLDER_OVERVIEW = "[text]";
const PLACEHOLDER_IMAGE = "[img]";
export default function useEditProfile() {
  const { address: endowmentAddr } = useParams<EndowmentAdminParams>();
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useFormContext<UpdateProfileValues>();
  const { wallet } = useGetWallet();
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);
  const dispatch = useSetter();
  const { showModal } = useModalContext();

  const editProfile = async ({
    title,
    description,
    initialProfile,
    ...data
  }: UpdateProfileValues) => {
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
      showModal(Popup, { message: "no changes detected" });
      return;
    }

    //run form change check first
    //upload if image is changed and is set to something
    if ("image" in diff && data.image) {
      //convert dataURL to file
      const imageRes = await fetch(data.image);
      const imageBlob = await imageRes.blob();
      const imageFile = new File([imageBlob], `banner_${endowmentAddr}`); //use endow address as unique imageName

      const key = imageFile.name;
      const file = await optimizeImage(imageFile);
      const url = await uploadToIpfs(key, file);

      if (url) {
        data.image = url;
      } else {
        showModal(Popup, { message: "Error uploading image" });
        return;
      }
    }

    const accountContract = new Account(endowmentAddr!, wallet?.address);
    const profileUpdateMsg = accountContract.createEmbeddedUpdateProfileMsg(
      //don't pass just diff here, old value should be included for null will be set if it's not present in payload
      cleanObject(data)
    );

    const profileUpdateMeta: EndowmentProfileUpdateMeta = {
      type: "endowment-update-profile",
      data: genDiffMeta(diffEntries, initialProfile),
    };

    const adminContract = new Admin(cwContracts, wallet?.address);
    const proposalMsg = adminContract.createProposalMsg(
      title,
      description,
      [profileUpdateMsg],
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
        successLink: genProposalsLink(cwContracts, endowmentAddr),
        successMessage: "Profile update proposal submitted",
      })
    );
    showModal(TransactionPrompt, {});
  };
  return {
    editProfile: handleSubmit(editProfile),
    isSubmitDisabled: isSubmitting || !isDirty,
  };
}
