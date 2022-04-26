import { ChainIDs, Denoms } from "@types-lists";

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

export type Coin = {
  amount: number; // "1000"
  denom: Denoms; //"denoms.uusd, denoms.uluna"
};

export type WalletInfo = {
  icon: string;
  displayCoin: Coin;
  coins: Coin[];
  address: string;
  chainId: ChainIDs;
  supported_denoms: Denoms[];
  id: TerraIdentifiers | undefined;
};

export type EthNetworks = "homestead" | "ropsten" | "bnb" | "bnbt";

export type EthState = {
  connected: boolean;
  network: EthNetworks;
  balance: number;
} & WalletInfo;
