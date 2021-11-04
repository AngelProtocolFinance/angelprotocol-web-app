import { NetworkInfo } from "@terra-dev/wallet-types";
import { chains, URLs } from "contracts/types";

export const urls: URLs = {
  [chains.localterra]: "http://localhost:1317",
  [chains.mainnet]: "https://apis.ankr.com/242bf15be1354eda8bad73fb320e9fb9/aae7334102f8f52264b50ad44bf343d3/terra/full/columbus",
  [chains.testnet]: "https://bombay-lcd.terra.dev",
};

const localterra = {
  name: "localterra",
  chainID: chains.localterra,
  lcd: urls[chains.localterra],
};

export const mainnet = {
  name: "mainnet",
  chainID: chains.mainnet,
  lcd: urls[chains.mainnet],
};

export const testnet = {
  name: "bombay",
  chainID: chains.testnet,
  lcd: urls[chains.testnet],
};

export const walletConnectChainIds: Record<number, NetworkInfo> = {
  0: testnet,
  1: mainnet,
  2: localterra,
};
