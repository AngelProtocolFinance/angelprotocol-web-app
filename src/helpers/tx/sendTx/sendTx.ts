import type { TxPackage } from "types/tx";
import { sendCosmosTx } from "./sendCosmosTx";
import { sendEVMTx } from "./sendEVMTx";
import { sendTerraTx } from "./sendTerraTx";

export default function sendTx({ sender, ...txPackage }: TxPackage) {
  switch (txPackage.chainID) {
    //juno
    case "juno-1":
    case "uni-6":
    //kujira
    case "kaiyo-1":
    case "harpoon-4":
    //osmosis
    case "osmosis-1":
    case "osmo-test-5":
    //stargaze
    case "stargaze-1":
    case "elgafar-1": {
      const { chainID, toSend, sign } = txPackage;
      return sendCosmosTx(chainID, sender, toSend, sign);
    }
    //terra
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
