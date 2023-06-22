import { FormProps, FormValues } from "./types";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads } from "helpers/admin";
import { isTooltip, useAdminContext } from "../../../Context";

export default function useUpdateMembers(action: FormProps["action"]) {
  const { multisig, txResource } = useAdminContext();
  const { sendTx, isSending } = useTxSender(true);

  async function updateMembers(fv: FormValues) {
    if (isTooltip(txResource)) throw new Error(txResource);

    const [data, dest, meta] = encodeTx(
      action === "add" ? "multisig.add-owner" : "multisig.remove-owner",
      {
        multisig,
        address: fv.address,
      },
      { action, address: fv.address }
    );

    const { wallet, txMeta } = txResource;
    const tx = createTx(wallet.address, "multisig.submit-transaction", {
      multisig: dest,
      title: fv.title,
      description: fv.description,
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
  }

  return { updateMembers, isSending };
}
