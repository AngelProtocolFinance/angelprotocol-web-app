import { EstimatedTx } from "types/tx";
import { ConnectedWallet } from "types/wallet";
import { sendCosmosTx } from "./sendCosmosTx";
import { sendEVMTx } from "./sendEVMTx";
import { sendTerraTx } from "./sendTerraTx";

export default function sendTx(wallet: ConnectedWallet, tx: EstimatedTx) {
  switch (tx.type) {
    case "cosmos":
      return sendCosmosTx(wallet, tx.val, tx.attribute);
    case "terra":
      return sendTerraTx(tx.wallet, tx.val);
    default:
      return sendEVMTx(wallet, tx.val, tx.log);
  }
}
