import { ExternalProvider } from "@ethersproject/providers/src.ts/web3-provider";
import { ethers } from "ethers";
export enum Providers {
  none = "none",
  ethereum = "ethereum",
  terra = "terra",

  // phantom = "phantom",
  // keplr = "keplr",
}
export type ProviderStates = Array<[Providers, boolean]>;

export type State = {
  active: Providers;
  isSwitching: boolean;
};

export interface Dwindow extends Window {
  xfi?: {
    ethereum?: ExternalProvider;
    binance?: any;
    bitcoin?: any;
    bitcoincash?: any;
    terra?: any;
    litecoin?: any;
    thorchain: any;
  };
  ethereum?: ExternalProvider;
}
