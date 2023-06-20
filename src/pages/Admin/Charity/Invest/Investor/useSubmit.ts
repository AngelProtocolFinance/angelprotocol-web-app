import { FormValues } from "./types";
import { AccountType } from "types/lists";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { scaleToStr } from "helpers";
import { getTagPayloads } from "helpers/admin";
import { useAdminResources } from "../../../Context";

export default function useSubmit(vault: string, type: AccountType) {
  const { multisig, id, checkSubmit } = useAdminResources();
  const { sendTx, isSending } = useTxSender(true);

  async function submit({ token }: FormValues) {
    const result = checkSubmit();
    if (typeof result === "function") return result();

    const [data, dest, meta] = encodeTx("accounts.invest", {
      id,
      account: type === "locked" ? 0 : 1,
      vaults: [vault],
      tokens: [token.token_id],
      amounts: [scaleToStr(token.amount)],
    });

    const { wallet, txMeta } = result;
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
      ...txMeta,
      tagPayloads: getTagPayloads(txMeta.willExecute && meta.id),
    });
  }

  return { submit, isSending };
}
