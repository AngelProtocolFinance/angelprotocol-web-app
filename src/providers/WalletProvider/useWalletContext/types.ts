import torusIcon from "assets/icons/wallets/torus.jpg";
import { ConnectionProxy } from "../types";

export const TORUS_CONNECTION: ConnectionProxy = {
  identifier: "torus",
  name: "Torus",
  type: "TORUS",
  icon: torusIcon,
};

export const NETWORK =
  process.env.REACT_APP_CHAIN_ID === "testnet" ? "testnet" : "mainnet";
