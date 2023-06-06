import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { useAdminContext } from "../../../../Context";

export default function useSubmit() {
  const { multisig, wallet, _tx } = useAdminContext();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<FV>();

  const sendTx = useTxSender();

  async function submit(fv: FV) {
    //check for changes

    const [data, dest, meta] = encodeTx("registrar.add-token", {
      token: fv.token,
    });

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
    submit: handleSubmit(submit),
    isSubmitDisabled: !isDirty || isSubmitting,
  };
}
