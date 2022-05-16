import torusIcon from "assets/icons/wallets/torus.jpg";
import { ConnectionProxy } from "../types";

export const TORUS_CONNECTION: ConnectionProxy = {
  identifier: "torus",
  name: "Torus",
  type: "TORUS",
  icon: torusIcon,
};

const isDevelopment = process.env.NODE_ENV === "development";
export const NETWORK = isDevelopment ? "testnet" : "mainnet";
