import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { isTooltip, useAdminContext } from "../../../../Context";

export default function useSubmit() {
  const { multisig, txResource } = useAdminContext();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<FV>();

  const sendTx = useTxSender();

  async function submit(fv: FV) {
    //check for changes
    if (isTooltip(txResource)) throw new Error(txResource);

    const [data, dest, meta] = encodeTx(
      "registrar.add-accounts-contract",
      {
        chainName: fv.chainName,
        contractAddress: fv.contractAddress,
      },
      { title: fv.title, description: fv.description, content: null as never }
    );

    const { wallet, txMeta } = txResource;
    await sendTx({
      content: {
        type: "evm",
        val: createTx(wallet.address, "multisig.submit-transaction", {
          multisig,
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
    tooltip: isTooltip(txResource) ? txResource : undefined,
  };
}
