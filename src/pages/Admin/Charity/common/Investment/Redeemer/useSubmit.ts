import { AccountType } from "types/lists";
import { useAdminResources } from "pages/Admin/Guard";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads } from "helpers/admin";

export default function useSubmit(vault: string, type: AccountType) {
  const { multisig, id, propMeta, getWallet } = useAdminResources();
  const { sendTx, isSending } = useTxSender(true);

  async function submit() {
    const wallet = getWallet();
    if (typeof wallet === "function") return wallet();

    const [data, dest] = encodeTx("accounts.redeem", {
      id,
      account: type === "locked" ? 0 : 1,
      vaults: [vault],
    });

    const tx = createTx(wallet.address, "multisig.submit-transaction", {
      multisig,
      title: "Redeem",
      description: `Redeem funds to: ${vault}`,
      destination: dest,
      value: "0",
      data,
    });

    await sendTx({
      content: { type: "evm", val: tx },
      ...propMeta,
      tagPayloads: getTagPayloads(propMeta.willExecute && "acc_redeem"),
    });
  }

  return { submit, isSending };
}
