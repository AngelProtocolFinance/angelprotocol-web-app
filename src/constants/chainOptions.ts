import type { WalletControllerChainOptions } from "@terra-money/wallet-provider";
import { IS_TEST } from "./env";

/**
 * from: https://assets.terra.money/chains.json
 * FUTURE: convert to top level await
 * export const chains:Type = await fetch('https://assets.terra.money/chains.json').then(r => r.json())
 */
const chains = {
  mainnet: {
    name: "mainnet",
    chainID: "phoenix-1",
    lcd: "https://phoenix-lcd.terra.dev",
    api: "https://phoenix-api.terra.dev",
    hive: "https://phoenix-hive.terra.dev/graphql",
    walletconnectID: 1,
  },
  classic: {
    name: "classic",
    chainID: "columbus-5",
    lcd: "https://terra-classic-lcd.publicnode.com",
    api: "https://terra-classic-public-api.publicnode.com",
    mantle: "https://columbus-mantle.terra.dev",
    walletconnectID: 2,
  },
  testnet: {
    name: "testnet",
    chainID: "pisco-1",
    lcd: "https://pisco-lcd.terra.dev",
    api: "https://pisco-api.terra.dev",
    hive: "https://pisco-hive.terra.dev/graphql",
    walletconnectID: 0,
  },
  localterra: {
    name: "localterra",
    chainID: "localterra",
    lcd: "http://localhost:1317",
    mantle: "http://localhost:1337",
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
