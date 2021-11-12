export interface XFI {
  bitcoin?: any;
  ethereum?: any;
  //others to add if needed
}

export interface Phantom {
  solana?: any;
}

export interface DWindow extends Window {
  solana?: any;
  phantom?: any;
  ethereum: any;
  xfi?: XFI;
}
