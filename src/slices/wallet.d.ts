declare module "@types-slice/wallet" {
  import { TokenWithBalance } from "@types-services/terra";
  type TerraWalletIDs =
    | "terra_wc"
    | "station"
    | "xdefi-wallet"
    | "leap-wallet"
    | "SafePal"
    | "torus";

  type WalletInfo = {
    icon: string;
    displayCoin: { amount: number; symbol: string };
    coins: TokenWithBalance[];
    address: string;
    chainId: string;
    id: TerraIdentifiers | undefined;
  };
}
