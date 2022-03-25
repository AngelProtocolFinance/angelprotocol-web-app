import { ExternalProvider } from "@ethersproject/providers/src.ts/web3-provider";

export interface Dwindow extends Window {
  xfi?: {
    ethereum?: ExternalProvider;
  };
  ethereum?: ExternalProvider;
}
