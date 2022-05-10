import {
  NetworkInfo,
  WalletControllerChainOptions,
} from "@terra-money/wallet-provider";
import { terra_lcds } from "constants/urls";

const localterra: NetworkInfo = {
  name: "localterra",
  chainID: "localterra",
  lcd: terra_lcds["localterra"],
};

export const mainnet: NetworkInfo = {
  name: "mainnet",
  chainID: "columbus-5",
  lcd: terra_lcds["columbus-5"],
};

export const testnet: NetworkInfo = {
  name: "testnet",
  chainID: "bombay-12",
  lcd: terra_lcds["bombay-12"],
};

export const chainOptions: WalletControllerChainOptions = {
  defaultNetwork: mainnet,
  walletConnectChainIds: { 0: testnet, 1: mainnet, 2: localterra },
};
