import { ReactNode } from "react";

export enum Connectors {
  injected = "injected",
  torus = "torus",
  ledger = "ledger",
  walletconnect = "walletconnect",
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
  walletconnect = "walletconnect",
  uknown = "unknown",
}

export type Props = {
  children: ReactNode;
};
