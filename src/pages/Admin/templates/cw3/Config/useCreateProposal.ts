import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { MultisigConfig } from "services/types";
import { useModalContext } from "contexts/ModalContext";
import Prompt from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { isEmpty } from "helpers";
import { getPayloadDiff, getTagPayloads } from "helpers/admin";
import { isTooltip, useAdminContext } from "../../../Context";

export default function usePropose() {
  const { multisig, txResource } = useAdminContext();
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

    if (isTooltip(txResource)) throw new Error(txResource);

    const [data, dest, meta] = encodeTx(
      "multisig.change-threshold",
      {
        multisig,
        threshold: +threshold,
      },
      { new: +threshold, curr: +initial.threshold }
    );

    const { wallet, txMeta } = txResource;
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
      ...txMeta,
      tagPayloads: getTagPayloads(txMeta.willExecute && meta.id),
    });
  }

  return {
    createProposal: handleSubmit(createProposal),
    isSubmitDisabled: isSubmitting || !isValid || !isDirty,
  };
}
