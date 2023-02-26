import Prompt from "@giving/components/prompt";
import { useAdminResources } from "@giving/contexts/admin";
import { useModalContext } from "@giving/contexts/modal-context";
import { useGetWallet } from "@giving/contexts/wallet-context";
import CW3 from "@giving/contracts/CW3";
import IndexFund from "@giving/contracts/IndexFund";
import useCosmosTxSender from "@giving/hooks/useCosmosTxSender/useCosmosTxSender";
import { useFormContext } from "react-hook-form";
import { OwnerUpdateMeta } from "@giving/types/pages/admin";
import { IndexFundOwnerValues } from "@giving/types/pages/admin";

export default function useUpdateOwner() {
  const { cw3, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<IndexFundOwnerValues>();

  const { showModal } = useModalContext();
  const sendTx = useCosmosTxSender();

  async function updateOwner(data: IndexFundOwnerValues) {
    //check for changes
    if (data.initialOwner === data.new_owner) {
      showModal(Prompt, { children: "no changes detected" });
      return;
    }

    const indexFundContract = new IndexFund(wallet);
    const configUpdateMsg = indexFundContract.createEmbeddedOwnerUpdateMsg({
      new_owner: data.new_owner,
    });

    const ownerUpdateMeta: OwnerUpdateMeta = {
      type: "if_owner",
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
