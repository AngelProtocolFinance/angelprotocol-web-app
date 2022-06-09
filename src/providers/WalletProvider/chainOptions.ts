import {
  NetworkInfo,
  WalletControllerChainOptions,
} from "@terra-money/wallet-provider";
import { chainIDs } from "constants/chainIDs";
import { terra_lcds } from "constants/urls";

const localterra: NetworkInfo = {
  name: "localterra",
  chainID: chainIDs.terra_local,
  lcd: terra_lcds[chainIDs.terra_local],
};

export const mainnet: NetworkInfo = {
  name: "mainnet",
  chainID: chainIDs.terra_classic,
  lcd: terra_lcds[chainIDs.terra_classic],
};

const testnet: NetworkInfo = {
  name: "testnet",
  chainID: chainIDs.terra_test,
  lcd: terra_lcds[chainIDs.terra_test],
};

export const chainOptions: WalletControllerChainOptions = {
  defaultNetwork: mainnet,
  walletConnectChainIds: { 0: testnet, 1: mainnet, 2: localterra },
};
