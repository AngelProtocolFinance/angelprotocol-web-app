declare module "@types-slice/provider" {
  import { ExternalProvider } from "@ethersproject/providers/src.ts/web3-provider";
  type Providers = "none" | "ethereum" | "binance" | "terra";
  type ProviderStates = Array<[Providers, boolean]>;
  interface Dwindow extends Window {
    xfi?: {
      ethereum?: any;
    };
    ethereum?: any;
    BinanceChain?: any;
  }
}
