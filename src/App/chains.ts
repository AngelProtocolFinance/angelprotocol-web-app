import { NetworkInfo } from "@terra-money/wallet-provider";
import { terra_lcds } from "constants/urls";
import { chainIDs } from "contracts/types";

const localterra = {
  name: "localterra",
  chainID: chainIDs.localterra,
  lcd: terra_lcds[chainIDs.localterra],
};

export const mainnet = {
  name: "mainnet",
  chainID: chainIDs.mainnet,
  lcd: terra_lcds[chainIDs.mainnet],
};

export const testnet = {
  name: "bombay",
  chainID: chainIDs.testnet,
  lcd: terra_lcds[chainIDs.testnet],
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
