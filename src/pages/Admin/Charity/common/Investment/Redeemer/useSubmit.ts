import { AccountType } from "types/lists";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads } from "helpers/admin";
import { isTooltip, useAdminContext } from "../../../../Context";

export default function useSubmit(vault: string, type: AccountType) {
  const { multisig, id, txResource } = useAdminContext();
  const { sendTx, isSending } = useTxSender(true);

  async function submit() {
    if (isTooltip(txResource)) throw Error(txResource);

    const [data, dest, meta] = encodeTx(
      "accounts.redeem",
      {
        id,
        account: type === "locked" ? 0 : 1,
        vaults: [vault],
      },
      {
        title: "Redeem",
        description: `Redeem funds to: ${vault}`,
        content: null as never,
      }
    );

    const { wallet, txMeta } = txResource;
    const tx = createTx(wallet.address, "multisig.submit-transaction", {
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
  }

  return { submit, isSending };
}
