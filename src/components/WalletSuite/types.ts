import { ConnectType } from "@terra-dev/use-wallet";
import { ReactNode } from "react";

export enum None {
  none = "none",
}
export enum Future {
  future = "future",
}
export enum Wallets {
  none = None.none,
  terraStationMobile = ConnectType.WALLETCONNECT,
  terraStationExt = ConnectType.CHROME_EXTENSION,
  future = Future.future,
}

export type WalletStates = Array<[Wallets, boolean]>;

export type Icons = {
  [key in Wallets]: string | ReactNode;
};

export type Displays = {
  [key in Wallets]: ReactNode;
};

export type Changer = (wallet: Wallets) => void;

export type Props = {
  children: ReactNode;
};
