import { TokenWithBalance } from "services/terra/multicall/types";

export enum TerraIdentifiers {
  //watch for this to change in @terra-money/wallet-provider updates
  terra_wc = "terra_wc",
  station = "station",
  xdefi = "xdefi-wallet",
  leap = "leap-wallet",
  safepal = "SafePal",
  torus = "torus",
}

export enum Providers {
  none = "none",
  ethereum = "ethereum",
  binance = "binance",
  terra = "terra",

  // phantom = "phantom",
  // keplr = "keplr",
}

<<<<<<< HEAD
=======
export type Coin = {
  amount: number; // "1000"
  denom: denoms; //"denoms.uluna"
};

>>>>>>> master
export type WalletInfo = {
  icon: string;
  displayCoin: { amount: number; symbol: string };
  coins: TokenWithBalance[];
  address: string;
  chainId: string;
  id: TerraIdentifiers | undefined;
};

export type State = { isUpdating: boolean } & WalletInfo;
