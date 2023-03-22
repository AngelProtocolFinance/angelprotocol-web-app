import { WalletState } from "contexts/WalletContext";
import { EstimatedTx } from "slices/donation";
import { sendCosmosTx } from "./sendCosmosTx";
import { sendEVMTx } from "./sendEVMTX";
import { sendTerraTx } from "./sendTerraTx";

export default function sendTx(wallet: WalletState, tx: EstimatedTx) {
  try {
    switch (tx.type) {
      case "cosmos":
        return sendCosmosTx(wallet, tx.val);
      case "terra":
        return sendTerraTx(tx.wallet, tx.val);
      default:
        return sendEVMTx(wallet, tx.val);
    }
  } catch (err) {
    return null;
  }
}
