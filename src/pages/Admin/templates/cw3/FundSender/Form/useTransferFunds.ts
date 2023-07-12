import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "../types";
import { TransferMeta, TxMeta } from "types/tx";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { scale, toAbiStr } from "helpers";
import { getTagPayloads } from "helpers/admin";
import { EMPTY_DATA } from "constants/evm";
import { isTooltip, useAdminContext } from "../../../../Context";

export default function useTransferFunds() {
  const {
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = useFormContext<FV>();
  const { multisig, txResource } = useAdminContext();
  const sendTx = useTxSender();

  async function transferFunds(fv: FV) {
    if (isTooltip(txResource)) throw new Error(txResource);
    const { token, recipient } = fv;
    const scaledAmount = scale(token.amount, token.decimals).toHex();

    const metadata: TransferMeta = {
      to: recipient,
      token: {
        symbol: token.symbol,
        amount: +token.amount,
        logo: token.logo,
      },
    };
    const toEncode: TxMeta = {
      id: "erc20.transfer",
      data: metadata,
      title: fv.title,
      description: fv.description,
    };

    const native: ReturnType<typeof encodeTx> = [
      EMPTY_DATA,
      recipient,
      { id: "erc20.transfer", encoded: toAbiStr(toEncode) },
    ];
    const [data, dest, meta, value] =
      token.type === "erc20"
        ? [
            ...encodeTx(
              "erc20.transfer",
              {
                erc20: token.token_id,
                to: recipient,
                amount: scaledAmount,
              },
              {
                content: metadata,
                title: fv.title,
                description: fv.description,
              }
            ),
            "0" /** value for non payable */,
          ]
        : [...native, scaledAmount];

    const { wallet, txMeta } = txResource;
    const tx = createTx(wallet.address, "multisig.submit-transaction", {
      multisig,
      destination: dest,
      value,
      data,
      meta: meta.encoded,
    });

    await sendTx({
      content: { type: "evm", val: tx },
      ...txMeta,
      tagPayloads: getTagPayloads(txMeta.willExecute && meta.id),
    });
  }

  return {
    transferFunds: handleSubmit(transferFunds),
    isSubmitDisabled: isSubmitting || !isValid || !isDirty,
    tooltip: isTooltip(txResource) ? txResource : undefined,
  };
}
