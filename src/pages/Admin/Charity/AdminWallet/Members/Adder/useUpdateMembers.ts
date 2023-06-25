import { FormProps, FormValues } from "./types";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads } from "helpers/admin";
import { useAdminResources } from "../../../../Guard";

export default function useUpdateMembers(action: FormProps["action"]) {
  const { multisig, checkSubmit } = useAdminResources();
  const { sendTx, isSending } = useTxSender(true);

  async function updateMembers(fv: FormValues) {
    const checkResult = checkSubmit();
    if (typeof checkResult === "function") return checkResult();

    const [data, dest, meta] = encodeTx(
      action === "add" ? "multisig.add-owners" : "multisig.remove-owners",
      {
        multisig,
        addresses: [fv.address],
      },
      {
        title: fv.title,
        description: fv.description,
        content: { action, address: fv.address },
      }
    );

    const { wallet, txMeta } = checkResult;
    const tx = createTx(wallet.address, "multisig.submit-transaction", {
      multisig: dest,
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
