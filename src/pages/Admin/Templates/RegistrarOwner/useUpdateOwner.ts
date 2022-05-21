import { useFormContext } from "react-hook-form";
import { OwnerUpdateMeta, RegistrarOwnerValues } from "pages/Admin/types";
import { adminTags, terraTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetter } from "store/accessors";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import Admin from "contracts/Admin";
import Registrar from "contracts/Registrar";
import useWalletContext from "hooks/useWalletContext";
import genProposalsLink from "../genProposalsLink";

export default function useUpdateOwner() {
  const { wallet } = useWalletContext();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<RegistrarOwnerValues>();

  const { showModal } = useModalContext();
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

    const ownerUpdateMeta: OwnerUpdateMeta = {
      type: "registrar-update-owner",
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
            { type: terraTags.admin, id: adminTags.proposals },
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
