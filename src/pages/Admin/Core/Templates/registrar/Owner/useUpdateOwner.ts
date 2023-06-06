import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Prompt from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { useAdminContext } from "../../../../Context";

export default function useUpdateOwner() {
  const { multisig, wallet, _tx } = useAdminContext();
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

    const [data, dest, meta] = encodeTx(
      "registrar.update-owner",
      {
        newOwner: fv.newOwner,
      },
      { curr: fv.initialOwner, new: fv.newOwner }
    );

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
      ..._tx,
    });
  }

  return {
    updateOwner: handleSubmit(updateOwner),
    isSubmitDisabled: !isDirty || isSubmitting,
  };
}
