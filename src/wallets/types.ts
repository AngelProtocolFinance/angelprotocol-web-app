import { Coin as CosmosCoin } from "@cosmjs/stargate";
import { Keplr } from "@keplr-wallet/types";
import { ReactNode } from "react";

export type Props = {
  children: ReactNode;
};

export type State = {
  loading: boolean;
  connected: boolean;
  balance: number;
  address: string;
  provider: any | null;
};

export type Setters = {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
};

export type KeplrState = {
  loading: boolean;
  connected: boolean;
  address: string;
  provider: Keplr | undefined;
  balance: CosmosCoin[];
};
