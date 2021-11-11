export interface XFI {
  bitcoin?: any;
  ethereum?: any;
  //others to add if needed
}

export interface DWindow extends Window {
  solana?: any;
  ethereum: any;
  xfi?: XFI;
}
