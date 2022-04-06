import { CreateTxOptions } from "@terra-money/terra.js";
import { mainnet } from "../chainOptions";
import { ConnectionProxy, WalletProxy } from "../types";

export default function createDefaultWallet(
  connection: ConnectionProxy
): WalletProxy {
  return {
    address: "",
    connection,
    network: mainnet,
    post: (_: CreateTxOptions) => {
      throw Error("Not initialized");
    },
    connect: () => {
      throw Error("Not initialized");
    },
    disconnect: () => {
      throw Error("Not initialized");
    },
  };
}
