import {
  NetworkInfo,
  WalletControllerChainOptions,
} from "@terra-money/wallet-provider";
import { chainIDs } from "types/chainIDs";
import { terra_lcds } from "constants/urls";

const localterra: NetworkInfo = {
  name: "localterra",
  chainID: chainIDs.localterra,
  lcd: terra_lcds[chainIDs.localterra],
};

export const mainnet: NetworkInfo = {
  name: "mainnet",
  chainID: chainIDs.mainnet,
  lcd: terra_lcds[chainIDs.mainnet],
};

const testnet: NetworkInfo = {
  name: "testnet",
  chainID: chainIDs.testnet,
  lcd: terra_lcds[chainIDs.testnet],
};

export const chainOptions: WalletControllerChainOptions = {
  defaultNetwork: mainnet,
  walletConnectChainIds: { 0: testnet, 1: mainnet, 2: localterra },
};
