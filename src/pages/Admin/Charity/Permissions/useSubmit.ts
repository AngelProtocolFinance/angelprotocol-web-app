import { useFormContext } from "react-hook-form";
import { FV } from "./types";
import { useErrorContext } from "contexts/ErrorContext";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { isEmpty } from "helpers";
import { getPayloadDiff, getTagPayloads } from "helpers/admin";
import { useAdminContext } from "../../Context";
import { controllerUpdate } from "./helpers";

export default function useSubmit() {
  const {
    id,
    multisig,
    settingsController: settings,
    checkSubmit,
  } = useAdminContext<"charity">();
  const { handleError } = useErrorContext();
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    reset,
  } = useFormContext<FV>();
  const sendTx = useTxSender();

  async function onSubmit({ initial, ...fv }: FV) {
    try {
      const update = controllerUpdate(id, fv, settings);
      const diff = getPayloadDiff(initial, update);

      if (isEmpty(diff)) {
        return handleError("No changes detected");
      }

      const result = checkSubmit();
      if (typeof result === "function") return result();

      const [data, dest, meta] = encodeTx(
        "accounts.update-controller",
        update,
        diff
      );
      const { wallet, txMeta } = result;
      const tx = createTx(wallet.address, "multisig.submit-transaction", {
        multisig,
        title: `Update permission settings`,
        description: `Update permission settings for endowment id:${id} by member:${wallet?.address}`,
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
    } catch (error) {
      handleError(error);
    }
  }

  return {
    errors,
    isSubmitting,
    reset: () => reset(),
    submit: handleSubmit(onSubmit),
  };
}
