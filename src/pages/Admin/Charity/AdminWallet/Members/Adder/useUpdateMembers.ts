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
      action === "add" ? "multisig.add-owner" : "multisig.remove-owner",
      {
        multisig,
        address: fv.address,
      },
      { action, address: fv.address }
    );

    const { wallet, txMeta } = checkResult;
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
