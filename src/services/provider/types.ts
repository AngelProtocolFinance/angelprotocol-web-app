import { ExternalProvider } from "@ethersproject/providers/src.ts/web3-provider";
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

export interface XdefiWindow extends Window {
  xfi?: {
    ethereum?: ExternalProvider;
    terra?: any;
  };
}
