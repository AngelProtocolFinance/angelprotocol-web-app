import { AccountType } from "types/lists";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads } from "helpers/admin";
import { useAdminContext } from "../../../../Context";

export default function useSubmit(vault: string, type: AccountType) {
  const { multisig, id, checkSubmit } = useAdminContext();
  const { sendTx, isSending } = useTxSender(true);

  async function submit() {
    const result = checkSubmit();
    if (typeof result === "function") return result();

    const [data, dest, meta] = encodeTx("accounts.redeem", {
      id,
      account: type === "locked" ? 0 : 1,
      vaults: [vault],
    });

    const { wallet, txMeta } = result;
    const tx = createTx(wallet.address, "multisig.submit-transaction", {
      multisig,
      title: "Redeem",
      description: `Redeem funds to: ${vault}`,
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
