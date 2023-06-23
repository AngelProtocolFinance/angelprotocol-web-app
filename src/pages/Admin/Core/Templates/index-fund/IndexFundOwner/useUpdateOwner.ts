import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Prompt from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { isTooltip, useAdminContext } from "../../../../Context";

export default function useUpdateOwner() {
  const { multisig, txResource } = useAdminContext();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<FV>();

  const { showModal } = useModalContext();
  const sendTx = useTxSender();

  async function updateOwner(fv: FV) {
    //check for changes
    if (fv.owner === fv.newOwner) {
      return showModal(Prompt, {
        type: "error",
        title: "Update Owner",
        headline: "No Changes Detected",
        children: "Nothing to submit, no changes detected",
      });
    }

    if (isTooltip(txResource)) throw new Error(txResource);

    const [data, dest, meta] = encodeTx(
      "index-fund.update-owner",
      {
        newOwner: fv.newOwner,
      },
      { curr: fv.owner, new: fv.newOwner }
    );

    const { wallet, txMeta } = txResource;
    await sendTx({
      content: {
        type: "evm",
        val: createTx(wallet.address, "multisig.submit-transaction", {
          multisig,
          title: fv.title,
          description: fv.description,
          destination: dest,
          value: "0",
          data,
          meta: meta.encoded,
        }),
      },
      ...txMeta,
    });
  }

  return {
    updateOwner: handleSubmit(updateOwner),
    isSubmitDisabled: !isDirty || isSubmitting,
    tooltip: isTooltip(txResource) ? txResource : undefined,
  };
}
