import { FormValues } from "./types";
import { AccountType } from "types/lists";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { scaleToStr } from "helpers";
import { getTagPayloads } from "helpers/admin";
import { isTooltip, useAdminContext } from "../../../Context";

export default function useSubmit(vault: string, type: AccountType) {
  const { multisig, id, txResource } = useAdminContext();
  const { sendTx, isSending } = useTxSender(true);

  async function submit({ token }: FormValues) {
    if (isTooltip(txResource)) throw new Error(txResource);

    const [data, dest, meta] = encodeTx(
      "accounts.invest",
      {
        id,
        account: type === "locked" ? 0 : 1,
        vaults: [vault],
        tokens: [token.token_id],
        amounts: [scaleToStr(token.amount)],
      },
      {
        title: "Invest",
        description: `Invest funds to: ${vault}`,
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
