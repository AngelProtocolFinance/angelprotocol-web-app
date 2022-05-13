import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import genDiffMeta from "pages/Admin/Templates/genDiffMeta";
import genProposalsLink from "pages/Admin/Templates/genProposalsLink";
import { ProposalMeta } from "pages/Admin/types";
import { EndowmentAddrParams } from "pages/EndowmentAdmin/types";
import { admin, tags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { useModalContext } from "components/ModalContext/ModalContext";
import Popup from "components/Popup/Popup";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import Account from "contracts/Account";
import Admin from "contracts/Admin";
import { UpdateProfilePayload as UP } from "contracts/types";
import useFleek from "hooks/useFleek";
import useWalletContext from "hooks/useWalletContext";
import cleanObject from "helpers/cleanObject";
import getPayloadDiff from "helpers/getPayloadDiff";
import optimizeImage from "helpers/optimizeImage";
import { ObjectEntries } from "types/utils";
import { proposalTypes } from "constants/routes";
import { UpdateProfileValues } from "./profileEditSchema";

const PLACEHOLDER_OVERVIEW = "[text]";
const PLACEHOLDER_IMAGE = "[img]";
export default function useEditProfile() {
  const { address: endowmentAddr } = useParams<EndowmentAddrParams>();
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useFormContext<UpdateProfileValues>();
  const { wallet } = useWalletContext();
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);
  const dispatch = useSetter();
  const { showModal } = useModalContext();
  const { upload } = useFleek();

  const editProfile = async ({
    title,
    description,
    initialProfile,
    ...data
  }: UpdateProfileValues) => {
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
      const url = await upload(key, file);

      if (url) {
        data.image = url;
      } else {
        showModal(Popup, { message: "Error uploading image" });
        return;
      }
    }

    const accountContract = new Account(endowmentAddr!, wallet);
    const profileUpdateMsg = accountContract.createEmbeddedUpdateProfileMsg(
      //don't pass just diff here, old value should be included for null will be set if it's not present in payload
      cleanObject(data)
    );

    const profileUpdateMeta: ProposalMeta = {
      type: proposalTypes.endowment_updateProfile,
      data: genDiffMeta(diffEntries, initialProfile),
    };

    const adminContract = new Admin(cwContracts, wallet);
    const proposalMsg = adminContract.createProposalMsg(
      title,
      description,
      [profileUpdateMsg],
      JSON.stringify(profileUpdateMeta)
    );

    dispatch(
      sendTerraTx({
        msgs: [proposalMsg],
        wallet,
        tagPayloads: [
          terra.util.invalidateTags([
            { type: tags.admin, id: admin.proposals },
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
