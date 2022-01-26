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
