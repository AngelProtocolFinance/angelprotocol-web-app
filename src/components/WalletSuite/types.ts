import { ReactNode } from "react";

export enum Connectors {
  injected = "injected",
  torus = "torus",
  ledger = "ledger",
}

export enum Icons {
  terra_mobile = "terra_mobile",
  terra_ext = "terra_ext",
  metamask = "metamask",
  xdefi = "xdefi",
  torus = "torus",
  ledger = "ledger",
  phantom = "phantom",
  keplr = "keplr",
  uknown = "unknown",
}

export enum Wallets {
  none = "none",
  ethereum = "ethereum",
  terra = "terra",
  phantom = "phantom",
}

export type State = {
  activeWallet: Wallets;
  isLoading: boolean;
};

export type WalletStates = Array<[Wallets, boolean]>;

export type Displays = {
  [key in Wallets]: ReactNode;
};

export interface dWindow extends Window {
  ethereum: any;
  xfi?: any;
}

export type Props = {
  children: ReactNode;
};
