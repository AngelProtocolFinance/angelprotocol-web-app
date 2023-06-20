import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Prompt from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { useAdminResources } from "../../../../Context";

export default function useUpdateOwner() {
  const { multisig, checkSubmit } = useAdminResources();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<FV>();

  const { showModal } = useModalContext();
  const sendTx = useTxSender();

  async function updateOwner(fv: FV) {
    //check for changes
    if (fv.initialOwner === fv.newOwner) {
      return showModal(Prompt, {
        type: "error",
        title: "Update Owner",
        headline: "No Changes Detected",
        children: "Nothing to submit, no changes detected",
      });
    }

    const result = checkSubmit();
    if (typeof result === "function") return result();

    const [data, dest, meta] = encodeTx(
      "registrar.update-owner",
      {
        newOwner: fv.newOwner,
      },
      { curr: fv.initialOwner, new: fv.newOwner }
    );

    const { wallet, txMeta } = result;
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
  };
}
