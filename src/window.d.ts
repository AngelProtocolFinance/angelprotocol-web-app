import type { Window as KeplrWindow } from "@keplr-wallet/types";

declare global {
  interface Window extends KeplrWindow {
    xfi?: {
      ethereum?: { isMetaMask?: boolean; [index: string]: any };
      terra?: any;
    };
    ethereum?: any;
    BinanceChain?: any;
  }
}
