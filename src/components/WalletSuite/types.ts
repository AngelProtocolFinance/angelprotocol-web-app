import { ReactNode } from "react";

export enum Icons {
  terra_mobile = "terra_mobile",
  terra_ext = "terra_ext",
  metamask = "metamask",
}

export enum Wallets {
  none = "none",
  ethereum = "ethereum",
  terra = "terra",
}

export type WalletStates = Array<[Wallets, boolean]>;

export type Displays = {
  [key in Wallets]: ReactNode;
};

export type Changer = (wallet: Wallets) => void;

export type Props = {
  children: ReactNode;
};
