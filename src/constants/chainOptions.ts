import type {
  NetworkInfo,
  WalletControllerChainOptions,
} from "@terra-money/wallet-provider";
import { IS_TEST } from "./env";
import { APIs } from "./urls";

const baseProxyURL = APIs.nodeProxy;
/**
 * from: https://assets.terra.money/chains.json
 * FUTURE: convert to top level await
 * export const chains:Type = await fetch('https://assets.terra.money/chains.json').then(r => r.json())
 */

/** LCD endpoints provided here are used by ` terra.useWallet().post` */
const chains: Record<string, NetworkInfo> = {
  mainnet: {
    name: "mainnet",
    chainID: "phoenix-1",
    lcd: baseProxyURL + "/terra/lcd/main",
    walletconnectID: 1,
  },
  classic: {
    name: "classic",
    chainID: "columbus-5",
    lcd: baseProxyURL + "/terra/lcd/classic",
    walletconnectID: 2,
  },
  testnet: {
    name: "testnet",
    chainID: "pisco-1",
    lcd: baseProxyURL + "/terra/lcd/test",
    walletconnectID: 0,
  },
  localterra: {
    name: "localterra",
    chainID: "localterra",
    lcd: "http://localhost:1317",
    walletconnectID: 0,
  },
};

export const chainOptions: WalletControllerChainOptions = {
  defaultNetwork: IS_TEST ? chains.mainnet : chains.testnet,
  walletConnectChainIds: {
    [chains.mainnet.walletconnectID]: chains.mainnet,
    [chains.testnet.walletconnectID]: chains.testnet,
    [chains.classic.walletconnectID]: chains.classic,
  },
};
