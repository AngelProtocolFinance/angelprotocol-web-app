import { FormValues } from "./types";
import { AccountType } from "types/lists";
import { useAdminResources } from "pages/Admin/Guard";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { scaleToStr } from "helpers";
import { getTagPayloads } from "helpers/admin";

export default function useSubmit(vault: string, type: AccountType) {
  const { multisig, id, getWallet } = useAdminResources();
  const { sendTx, isSending } = useTxSender(true);

  async function submit({ token }: FormValues) {
    const wallet = getWallet();
    if (typeof wallet === "function") return wallet();

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
      ...wallet.meta,
      tagPayloads: getTagPayloads(wallet.meta.willExecute && meta.id),
    });
  }

  return { submit, isSending };
}
