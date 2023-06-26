import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Prompt from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { isEmpty } from "helpers";
import { getPayloadDiff } from "helpers/admin";
import { isTooltip, useAdminContext } from "../../../../Context";

export default function useConfigureRegistrar() {
  const { multisig, txResource } = useAdminContext();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<FV>();
  const { showModal } = useModalContext();
  const sendTx = useTxSender();

  async function configureRegistrar({
    title,
    description,
    initial,
    ...fv //registrarConfig
  }: FV) {
    //check for changes
    const diff = getPayloadDiff(initial, fv);
    if (isEmpty(diff)) {
      return showModal(Prompt, {
        type: "error",
        title: "Update Registrar",
        headline: "No Changes Detected",
        children: "Nothing to submit, no changes detected",
      });
    }

    if (isTooltip(txResource)) throw new Error(txResource);

    const [data, dest, meta] = encodeTx(
      "registrar.update-config",
      {
        ...initial,
        ...fv,
      },
      { title, description, content: diff }
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
    configureRegistrar: handleSubmit(configureRegistrar),
    isSubmitDisabled: !isDirty || isSubmitting,
    tooltip: isTooltip(txResource) ? txResource : undefined,
  };
}
