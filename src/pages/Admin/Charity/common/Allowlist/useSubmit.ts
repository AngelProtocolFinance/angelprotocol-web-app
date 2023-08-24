import { SubmitHandler, useFormContext } from "react-hook-form";
import { FormValues } from "./types";
import { AllowlistUpdate } from "types/contracts";
import { SimulContractTx } from "types/evm";
import { useModalContext } from "contexts/ModalContext";
import { TxPrompt } from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { isEmpty } from "helpers";
import { getTagPayloads } from "helpers/admin";
import { Operation, isTooltip, useAdminContext } from "../../../Context";

export default function useSubmit(op: Operation) {
  const { id, multisig, txResource } = useAdminContext<"charity">([op]);
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FormValues>();

  const { showModal } = useModalContext();
  const sendTx = useTxSender();
  const tooltip = isTooltip(txResource) ? txResource : undefined;

  const submit: SubmitHandler<FormValues> = async ({
    type,
    initial,
    addresses,
  }) => {
    try {
      if (isTooltip(txResource)) throw new Error(txResource);

      const toAdd = addresses.filter((a) => !initial.includes(a));
      const toRemove = initial.filter((a) => !addresses.includes(a));

      if (isEmpty(toAdd) && isEmpty(toRemove)) {
        return showModal(TxPrompt, { error: "No changes detected" });
      }

      const update: AllowlistUpdate = {
        id,
        allowlistType:
          type === "beneficiary" ? 0 : type === "contributor" ? 1 : 2,
        add: toAdd,
        remove: toRemove,
      };

      const { wallet, txMeta, isDelegated } = txResource;
      const [data, dest, meta] = encodeTx("accounts.update-allowlist", update, {
        title: `Update whitelists settings`,
        description: `Update whitelists settings for endowment id:${id} by member:${wallet.address}`,
        content: { add: toAdd, remove: toRemove },
      });

      const tx: SimulContractTx = isDelegated
        ? { from: wallet.address, to: dest, data }
        : createTx(wallet.address, "multisig.submit-transaction", {
            multisig,

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
    } catch (err) {
      showModal(TxPrompt, {
        error: err instanceof Error ? err.message : "Unknown error occured",
      });
    }
  };

  return {
    reset,
    submit: handleSubmit(submit),
    isSubmitting,
    tooltip,
  };
}
