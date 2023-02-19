import { useAdminResources } from "@/pages/Admin/Guard";
import { Popup } from "@ap/components";
import { useModalContext } from "@ap/contexts";
import { useGetWallet } from "@ap/contexts/wallet-context";
import { CW3, Registrar } from "@ap/contracts";
import useCosmosTxSender from "@ap/hooks/use-cosmos-tx-sender";
import { useFormContext } from "react-hook-form";
import { OwnerUpdateMeta, RegistrarOwnerValues } from "@ap/types/admin";

export default function useUpdateOwner() {
  const { cw3, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<RegistrarOwnerValues>();

  const { showModal } = useModalContext();
  const sendTx = useCosmosTxSender();

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
      type: "reg_owner",
      data: { owner: data.initialOwner, newOwner: data.new_owner },
    };

    const adminContract = new CW3(wallet, cw3);
    const proposalMsg = adminContract.createProposalMsg(
      data.title,
      data.description,
      [configUpdateMsg],
      JSON.stringify(ownerUpdateMeta)
    );

    await sendTx({
      msgs: [proposalMsg],
      ...propMeta,
    });
  }

  return {
    updateOwner: handleSubmit(updateOwner),
    isSubmitDisabled: !isDirty || isSubmitting,
  };
}
