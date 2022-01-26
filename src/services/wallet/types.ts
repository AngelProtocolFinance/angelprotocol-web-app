import { denoms } from "constants/currency";
import { chainIDs } from "constants/chainIDs";

export enum TerraIdentifiers {
  //watch for this to change in @terra-money/wallet-provider updates
  station = "station",
  xdefi = "xdefi-wallet",
  leap = "leap-wallet",
}

export enum Providers {
  none = "none",
  // ethereum = "ethereum",
  terra = "terra",

  // phantom = "phantom",
  // keplr = "keplr",
}

export type Coin = {
  amount: number; // "1000"
  denom: denoms; //"denoms.uusd, denoms.uluna"
};

export type WalletInfo = {
  icon: string;
  displayCoin: Coin;
  coins: Coin[];
  address: string;
  chainId: chainIDs;
};

export type State = { isUpdating: boolean } & WalletInfo;
