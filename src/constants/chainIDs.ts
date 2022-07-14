import { IS_TEST } from "./env";

export enum chainIDs {
  //for multi-chain wallets, generalize as either mainnet or testnet only
  bnb_main = "56",
  bnb_test = "97",
  cosmoshub_main = "cosmoshub-4",
  eth_kovan = "42",
  eth_main = "1",
  eth_ropsten = "3",
  juno_main = "juno-1",
  juno_test = "uni-3",
  terra_local = "localterra",
  terra_main = "phoenix-1",
  terra_test = "pisco-1",
  unsupported = "-1",
  none = "",
}

export const junoChainId = IS_TEST ? chainIDs.juno_test : chainIDs.juno_main;

export const terraChainId = IS_TEST ? chainIDs.terra_test : chainIDs.terra_main;

export const ethereumChainId = IS_TEST
  ? chainIDs.eth_ropsten
  : chainIDs.eth_main;
