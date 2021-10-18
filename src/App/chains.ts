import { NetworkInfo } from "@terra-dev/wallet-types";
import { chains, URLs } from "contracts/types";

export const urls: URLs = {
  [chains.localterra]: process.env.REACT_APP_LOCALTERRA_LCD as string,
  [chains.mainnet]: process.env.REACT_APP_MAINNET_LCD as string,
  [chains.testnet]: process.env.REACT_APP_BOMBAY_LCD as string,
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

const testnet = {
  name: "bombay",
  chainID: chains.testnet,
  lcd: urls[chains.testnet],
};

export const walletConnectChainIds: Record<number, NetworkInfo> = {
  0: testnet,
  1: mainnet,
  2: localterra,
};
