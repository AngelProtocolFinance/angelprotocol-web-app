import { denoms } from "constants/currency";
import { chainIDs } from "contracts/types";

export enum TerraIdentifiers {
  station = "station",
  xdefi = "xdefi-wallet",
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
