import { Window as KeplrWindow } from "@keplr-wallet/types";

export interface XFI {
  bitcoin?: any;
  ethereum?: any;
  terra?: any;
  //others to add if needed
}

export interface Phantom {
  solana?: any;
}

export interface DWindow extends KeplrWindow {
  solana?: any;
  phantom?: Phantom;
  ethereum: any;
  xfi?: XFI;
}
