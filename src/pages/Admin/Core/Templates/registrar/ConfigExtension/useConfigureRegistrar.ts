import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Prompt from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { isEmpty } from "helpers";
import { getPayloadDiff } from "helpers/admin";
import { useAdminResources } from "../../../../Context";

export default function useConfigureRegistrar() {
  const { multisig, checkSubmit } = useAdminResources();
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

    const result = checkSubmit();
    if (typeof result === "function") return result();

    const [data, dest, meta] = encodeTx(
      "registrar.update-config",
      {
        ...initial,
        ...fv,
      },
      diff
    );

    const { wallet, txMeta } = result;
    await sendTx({
      content: {
        type: "evm",
        val: createTx(wallet.address, "multisig.submit-transaction", {
          multisig,
          title,
          description,
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
  };
}
