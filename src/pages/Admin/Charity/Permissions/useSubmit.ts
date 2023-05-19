import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useAdminResources } from "pages/Admin/Guard";
import { useErrorContext } from "contexts/ErrorContext";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { isEmpty } from "helpers";
import { getPayloadDiff, getTagPayloads } from "helpers/admin";
import { createUpdateEndowmentControllerMsg } from "./helpers";
import { FormValues } from "./schema";

export default function useSubmit() {
  const {
    id,
    multisig,
    propMeta,
    settingsController: settings,
    getWallet,
  } = useAdminResources<"charity">();
  const { handleError } = useErrorContext();
  const {
    formState: { isSubmitting, errors, isValid },
    handleSubmit,
    reset,
    trigger,
  } = useFormContext<FormValues>();
  const sendTx = useTxSender();

  // if this effect is omitted and there are any errors,
  // once form is changed to a valid state the error messages do not disappear
  useEffect(() => {
    if (isValid) {
      trigger();
    }
  }, [isValid, trigger]);

  async function onSubmit({ initialValues, ...newValues }: FormValues) {
    try {
      const diff = getPayloadDiff(initialValues, newValues);

      if (isEmpty(Object.entries(diff))) {
        return handleError("No changes detected");
      }

      const wallet = getWallet();
      if (typeof wallet === "function") return wallet();

      const args = createUpdateEndowmentControllerMsg(id, diff, settings);

      const [data, dest] = encodeTx("accounts.update-controller", args);
      const tx = createTx(wallet.address, "multisig.submit-transaction", {
        multisig,
        title: `Update permission settings`,
        description: `Update permission settings for endowment id:${id} by member:${wallet?.address}`,
        destination: dest,
        value: "0",
        data,
      });

      await sendTx({
        content: { type: "evm", val: tx },
        ...propMeta,
        tagPayloads: getTagPayloads(propMeta.willExecute && "endow_controller"),
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
