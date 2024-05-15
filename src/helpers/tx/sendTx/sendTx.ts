import type { TxPackage } from "types/tx";
import { sendCosmosTx } from "./sendCosmosTx";
import { sendEVMTx } from "./sendEVMTx";
import { sendTerraTx } from "./sendTerraTx";

export default function sendTx({ sender, ...txPackage }: TxPackage) {
  switch (txPackage.chainID) {
    case "juno-1":
    case "uni-6": {
      const { chainID, toSend, sign } = txPackage;
      return sendCosmosTx(chainID, sender, toSend, sign);
    }
    case "phoenix-1":
    case "pisco-1": {
      const { chainID, toSend, post } = txPackage;
      return sendTerraTx(chainID, post, toSend);
    }
    default:
      const { chainID, toSend, request } = txPackage;
      return sendEVMTx(toSend, request, chainID);
  }
}
