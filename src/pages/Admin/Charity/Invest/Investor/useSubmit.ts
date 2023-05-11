import { FormValues } from "./types";
import { AccountType } from "types/lists";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { TxPrompt } from "components/Prompt";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { scaleToStr } from "helpers";
import { getTagPayloads } from "helpers/admin";

export default function useSubmit(vault: string, type: AccountType) {
  const { multisig, id, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const { sendTx, isSending } = useTxSender(true);
  const { showModal } = useModalContext();

  async function submit({ token }: FormValues) {
    if (!wallet) {
      return showModal(TxPrompt, { error: "Wallet is not connected" });
    }

    const [data, dest, meta] = encodeTx("accounts.invest", {
      id,
      account: type === "locked" ? 0 : 1,
      vaults: [vault],
      tokens: [token.token_id],
      amounts: [scaleToStr(token.amount)],
    });

    const tx = createTx(wallet.address, "multisig.submit-transaction", {
      multisig,
      title: "Invest",
      description: `Invest funds to: ${vault}`,
      destination: dest,
      value: "0",
      data,
      meta: meta.encoded,
    });

    await sendTx({
      content: { type: "evm", val: tx },
      ...propMeta,
      tagPayloads: getTagPayloads(propMeta.willExecute && "acc_invest"),
    });
  }

  return { submit, isSending };
}
