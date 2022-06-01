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
  walletconnectID: 2,
};

export const mainnet: NetworkInfo = {
  name: "mainnet",
  chainID: chainIDs.terra_main,
  lcd: terra_lcds[chainIDs.terra_main],
  walletconnectID: 2,
};

export const testnet: NetworkInfo = {
  name: "testnet",
  chainID: chainIDs.terra_test,
  lcd: terra_lcds[chainIDs.terra_test],
  walletconnectID: 0,
};

export const chainOptions: WalletControllerChainOptions = {
  defaultNetwork: mainnet,
  walletConnectChainIds: { 0: testnet, 1: mainnet, 2: localterra },
};
