import { FormProps, FormValues } from "./types";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads } from "helpers/admin";
import { useAdminContext } from "../../../../Context";

export default function useUpdateMembers(action: FormProps["action"]) {
  const { multisig, wallet, _tx } = useAdminContext();
  const { sendTx, isSending } = useTxSender(true);

  async function updateMembers(fv: FormValues) {
    const [data, dest, meta] = encodeTx(
      action === "add" ? "multisig.add-owner" : "multisig.remove-owner",
      {
        multisig,
        address: fv.address,
      },
      { action, address: fv.address }
    );

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
      ..._tx,
      tagPayloads: getTagPayloads(_tx.willExecute && meta.id),
    });
  }

  return { updateMembers, isSending };
}
