import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { MultisigConfig } from "services/types";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import Prompt from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { isEmpty } from "helpers";
import { getPayloadDiff, getTagPayloads } from "helpers/admin";

export default function usePropose() {
  const { multisig, checkSubmit } = useAdminResources();
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

    const result = checkSubmit();
    if (typeof result === "function") return result();

    const [data, dest, meta] = encodeTx(
      "multisig.change-threshold",
      {
        multisig,
        threshold: +threshold,
      },
      {
        title,
        description,
        content: { new: +threshold, curr: +initial.threshold },
      }
    );

    const { wallet, txMeta } = result;
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
