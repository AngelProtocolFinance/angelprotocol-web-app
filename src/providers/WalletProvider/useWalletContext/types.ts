import { TerraChainIDs } from "@types-lists";
import torusIcon from "assets/icons/wallets/torus.jpg";
import { ConnectionProxy } from "../types";

export const TORUS_CONNECTION: ConnectionProxy = {
  identifier: "torus",
  name: "Torus",
  type: "TORUS",
  icon: torusIcon,
};

export const NETWORK: "testnet" | "mainnet" =
  process.env.NODE_ENV === "development" ? "testnet" : "mainnet";

export const CHAIN_ID: TerraChainIDs =
  NETWORK === "mainnet" ? "columbus-5" : "bombay-12";
