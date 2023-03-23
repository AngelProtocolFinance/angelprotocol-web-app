import { EstimatedTx } from "types/tx";
import { WalletState } from "contexts/WalletContext";
import { sendCosmosTx } from "./sendCosmosTx";
import { sendEVMTx } from "./sendEVMTx";
import { sendTerraTx } from "./sendTerraTx";

export default function sendTx(
  wallet: WalletState,
  tx: EstimatedTx,
  attribute?: string
) {
  switch (tx.type) {
    case "cosmos":
      return sendCosmosTx(wallet, tx.val, attribute);
    case "terra":
      return sendTerraTx(tx.wallet, tx.val);
    default:
      return sendEVMTx(wallet, tx.val, attribute);
  }
}
