import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { MultisigConfig } from "services/types";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import Prompt from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { isEmpty } from "helpers";
import { getPayloadDiff, getTagPayloads } from "helpers/admin";

export default function usePropose() {
  const { multisig, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<FV>();
  const { showModal } = useModalContext();
  const sendTx = useTxSender();

  async function createProposal({
    title,
    description,
    initial,
    threshold,
    requireExecution,
  }: FV) {
    const config: MultisigConfig = {
      threshold: +threshold,
      requireExecution,
    };
    const diff = getPayloadDiff(initial, config);

    if (isEmpty(diff)) {
      return showModal(Prompt, {
        type: "error",
        title: "Create Proposal",
        headline: "No Changes Detected",
        children: "Nothing to submit, no changes detected",
      });
    }

    if (!wallet) {
      return showModal(Prompt, {
        type: "error",
        children: "Wallet is not connected",
      });
    }

    const [data, dest, meta] = encodeTx("multisig.change-threshold", {
      multisig,
      threshold: +threshold,
    });

    const tx = createTx(wallet.address, "multisig.submit-transaction", {
      multisig,
      title,
      description,
      destination: dest,
      value: "0",
      data,
      meta: meta.encoded,
    });

    await sendTx({
      content: { type: "evm", val: tx },
      ...propMeta,
      tagPayloads: getTagPayloads(propMeta.willExecute && meta.id),
    });
  }

  return {
    createProposal: handleSubmit(createProposal),
    isSubmitDisabled: isSubmitting || !isValid || !isDirty,
  };
}
