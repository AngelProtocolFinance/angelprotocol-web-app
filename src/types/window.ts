import { Keplr } from "@keplr-wallet/types";

export interface Dwindow extends Window {
  xfi?: {
    ethereum?: any;
    terra?: any;
  };
  ethereum?: any;
  BinanceChain?: any;
  keplr?: Keplr;
}
