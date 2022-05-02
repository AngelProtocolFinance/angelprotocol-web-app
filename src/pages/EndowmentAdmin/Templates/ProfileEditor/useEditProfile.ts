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
import useWalletContext from "hooks/useWalletContext";
import cleanObject from "helpers/cleanObject";
import getPayloadDiff from "helpers/getPayloadDiff";
import { ObjectEntries } from "types/utils";
import { proposalTypes } from "constants/routes";
import { UpdateProfileValues } from "./profileEditSchema";

const PLACEHOLDER_DESC = "[text]";
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

  const editProfile = async ({
    title,
    description,
    initialProfile,
    ...data
  }: UpdateProfileValues) => {
    //transform country to string

    const diff = getPayloadDiff(initialProfile, data);
    if ("overview" in diff) {
      //remove desc diff on tx preview
      diff.overview = PLACEHOLDER_DESC;
      initialProfile.overview = PLACEHOLDER_DESC;
    }

    const diffEntries = Object.entries(diff) as ObjectEntries<UP>;
    if (diffEntries.length <= 0) {
      showModal(Popup, { message: "no changes detected" });
      return;
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
