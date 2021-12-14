import { NetworkInfo } from "@terra-money/wallet-provider";
import { chains, URLs } from "contracts/types";

export const urls: URLs = {
  [chains.localterra]: "http://localhost:1317",
  [chains.mainnet]: "https://lcd.terra.dev",
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

interface MirrorNetworkInfo {
  name: string;
  chainId?: string;
  lcd: string;
}

export const networks: Record<string, MirrorNetworkInfo> = {
  mainnet: mainnet,
  testnet: testnet,
  localterra: localterra,
};
