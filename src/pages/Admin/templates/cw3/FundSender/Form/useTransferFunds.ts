import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "../types";
import { TxMeta } from "contracts/createTx/types";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import { TransferMeta } from "contracts/createTx/meta";
import useTxSender from "hooks/useTxSender";
import { scale, toBase64 } from "helpers";
import { getTagPayloads } from "helpers/admin";
import { EMPTY_DATA } from "constants/evm";
import { useAdminContext } from "../../../../Context";

export default function useTransferFunds() {
  const {
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = useFormContext<FV>();
  const { multisig, txResource } = useAdminContext();
  const sendTx = useTxSender();

  async function transferFunds(fv: FV) {
    if (typeof txResource === "string") throw new Error(txResource);
    const { token, recipient } = fv;
    const scaledAmount = scale(token.amount, token.decimals).toHex();

    const metadata: TransferMeta = {
      to: recipient,
      token: { symbol: token.symbol, amount: +token.amount, logo: token.logo },
    };
    const toEncode: TxMeta = { id: "erc20.transfer", data: metadata };

    const native: ReturnType<typeof encodeTx> = [
      EMPTY_DATA,
      recipient,
      { id: "erc20.transfer", encoded: toBase64(toEncode) },
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
              metadata
            ),
            "0" /** value for non payable */,
          ]
        : [...native, scaledAmount];

    const { wallet, txMeta } = txResource;
    const tx = createTx(wallet.address, "multisig.submit-transaction", {
      multisig,
      title: fv.title,
      description: fv.description,
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
  };
}
