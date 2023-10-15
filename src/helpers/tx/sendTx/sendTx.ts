import { ChainID } from "types/chain";
import { EstimatedTx } from "types/tx";
import { ConnectedWallet } from "types/wallet";
import { sendCosmosTx } from "./sendCosmosTx";
import { sendEVMTx } from "./sendEVMTx";
import { sendTerraTx } from "./sendTerraTx";

export default function sendTx(wallet: ConnectedWallet, tx: EstimatedTx) {
  switch (wallet.chainID) {
    case "juno-1":
      return sendCosmosTx(wallet.chainID);
  }
  switch (tx.chainID) {
    case "juno-1":
    case "uni-6":
      return sendCosmosTx(
        tx.chainID,
        wallet.address,
        wallet.id as "keplr" | "keplr-wc",
        tx.val,
        tx.attribute
      );
    case "phoenix-1":
    case "pisco-1":
      return sendTerraTx(tx.chainID, tx.wallet.post, tx.val);
    default:
      return sendEVMTx(tx.chainID, wallet.id, tx.val, tx.log);
  }
}
