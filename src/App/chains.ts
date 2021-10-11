import { NetworkInfo } from "@terra-dev/wallet-types";
import { chains } from "contracts/types";

const localterra = {
  name: "localterra",
  chainID: chains.localterra,
  lcd: "http://localhost:1317",
};

export const mainnet = {
  name: "mainnet",
  chainID: chains.mainnet,
  lcd: "https://lcd.terra.dev",
};

const testnet = {
  name: "bombay",
  chainID: chains.testnet,
  lcd: "https://bombay-lcd.terra.dev",
};

export const walletConnectChainIds: Record<number, NetworkInfo> = {
  0: testnet,
  1: mainnet,
  2: localterra,
};
