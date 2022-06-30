import { IS_TEST } from "./env";

export enum chainIDs {
  //for multi-chain wallets, generalize as either mainnet or testnet only
  terra_test = "pisco-1",
  terra_main = "phoenix-1",
  terra_local = "localterra",
  cosmoshub_main = "cosmoshub-4",
  juno_main = "juno-1",
  juno_test = "uni-3",
  eth_kovan = "42",
  eth_ropsten = "3",
  eth_main = "1",
  bnb_main = "56",
  bnb_test = "97",
  unsupported = "-1",
}

export const junoChainId = IS_TEST ? chainIDs.juno_test : chainIDs.juno_main;

export const terraChainId = IS_TEST
  ? chainIDs.terra_test
  : chainIDs.terra_classic;
