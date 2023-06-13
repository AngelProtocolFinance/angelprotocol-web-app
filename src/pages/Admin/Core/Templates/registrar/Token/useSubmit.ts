import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";

export default function useSubmit() {
  const { multisig, checkSubmit } = useAdminResources();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<FV>();

  const sendTx = useTxSender();

  async function submit(fv: FV) {
    //check for changes
    const result = checkSubmit();
    if (typeof result === "function") return result();

    const [data, dest, meta] = encodeTx("registrar.add-token", {
      token: fv.token,
    });

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
    submit: handleSubmit(submit),
    isSubmitDisabled: !isDirty || isSubmitting,
  };
}
