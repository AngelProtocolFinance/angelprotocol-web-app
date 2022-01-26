import { RequestArguments } from "types/eip1993";
export enum Providers {
  none = "none",
  // ethereum = "ethereum",
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
    ethereum?: {
      chainId: number;
      getaccounts: () => Promise<string[]>;
      request: (args: RequestArguments) => Promise<any>;
    };
  };
}
