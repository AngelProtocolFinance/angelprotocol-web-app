import { FormValues } from "./types";
import { InvestRequest } from "types/contracts";
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

    const investRequest: InvestRequest = {
      strategy: "0x12345678",
      token: "aUSDC",
      lockAmt: "100",
      liquidAmt: "100",
      gasFee: "1000",
    };

    const [data, dest, meta] = encodeTx(
      "accounts.invest-v2",
      {
        id,
        investRequest,
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
