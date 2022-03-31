import { CreateTxOptions } from "@terra-money/terra.js";
import { Connection, localterra, WalletProxy } from "../types";

export default function createDefaultWallet(
  connection: Connection
): WalletProxy {
  return {
    address: "",
    connection,
    network: localterra,
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
