import { useFormContext } from "react-hook-form";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import Popup from "components/Popup/Popup";
import { useSetModal } from "components/Modal/Modal";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { terra } from "services/terra/terra";
import { admin, tags } from "services/terra/tags";
import { useSetter } from "store/accessors";
import Admin from "contracts/Admin";
import genProposalsLink from "../genProposalsLink";
import useWalletContext from "hooks/useWalletContext";
import Registrar from "contracts/Registrar";
import { ProposalMeta } from "pages/Admin/types";
import { proposalTypes } from "constants/routes";
import { RegistrarOwnerValues } from "./updateOwnerSchema";

export default function useUpdateOwner() {
  const { wallet } = useWalletContext();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<RegistrarOwnerValues>();

  const { showModal } = useSetModal();
  const dispatch = useSetter();

  async function updateOwner(data: RegistrarOwnerValues) {
    //check for changes
    if (data.initialOwner === data.new_owner) {
      showModal(Popup, { message: "no changes detected" });
      return;
    }

    const registrarContract = new Registrar(wallet);
    const configUpdateMsg = registrarContract.createEmbeddedOwnerUpdateMsg({
      new_owner: data.new_owner,
    });

    const ownerUpdateMeta: ProposalMeta = {
      type: proposalTypes.registrar_updateOwner,
      data: { owner: data.initialOwner, newOwner: data.new_owner },
    };

    const adminContract = new Admin("apTeam", wallet);
    const proposalMsg = adminContract.createProposalMsg(
      data.title,
      data.description,
      [configUpdateMsg],
      JSON.stringify(ownerUpdateMeta)
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
        successLink: genProposalsLink("apTeam"),
        successMessage: "Owner update proposal submitted",
      })
    );
    showModal(TransactionPrompt, {});
  }

  return {
    updateOwner: handleSubmit(updateOwner),
    isSubmitDisabled: !isDirty || isSubmitting,
  };
}
