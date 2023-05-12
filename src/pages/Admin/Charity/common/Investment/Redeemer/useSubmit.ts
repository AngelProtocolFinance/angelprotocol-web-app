import { AccountType } from "types/lists";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import { TxPrompt } from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads } from "helpers/admin";

export default function useSubmit(vault: string, type: AccountType) {
  const { multisig, id, propMeta } = useAdminResources();
  const { sendTx, isSending } = useTxSender(true);
  const { wallet } = useGetWallet();
  const { showModal } = useModalContext();

  async function submit() {
    if (!wallet) {
      return showModal(TxPrompt, { error: "Wallet is not connected" });
    }

    const [data, dest, meta] = encodeTx("accounts.redeem", {
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
      meta: meta.encoded,
    });

    await sendTx({
      content: { type: "evm", val: tx },
      ...propMeta,
      tagPayloads: getTagPayloads(propMeta.willExecute && meta.id),
    });
  }

  return { submit, isSending };
}
