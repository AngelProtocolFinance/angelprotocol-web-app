import torusIcon from "assets/icons/wallets/torus.jpg";
import { chainIDs } from "constants/chainIDs";
import { ConnectionProxy } from "../types";

export const TORUS_CONNECTION: ConnectionProxy = {
  identifier: "torus",
  name: "Torus",
  type: "TORUS",
  icon: torusIcon,
};

const isDevelopment = process.env.NODE_ENV === "development";
export const NETWORK = isDevelopment ? "testnet" : "mainnet";
export const CHAIN_ID = isDevelopment
  ? chainIDs.terra_test
  : chainIDs.terra_main;
