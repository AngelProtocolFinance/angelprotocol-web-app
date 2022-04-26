declare module "@types-slice/wallet" {
  import { ChainIDs, Denoms } from "@types-lists";
  type TerraWalletIDs =
    | "terra_wc"
    | "station"
    | "xdefi-wallet"
    | "leap-wallet"
    | "SafePal"
    | "torus";

  type Coin = {
    amount: number; // "1000"
    denom: Denoms; //"denoms.uusd, denoms.uluna"
  };

  type WalletInfo = {
    icon: string;
    displayCoin: Coin;
    coins: Coin[];
    address: string;
    chainId: ChainIDs;
    supported_denoms: Denoms[];
    id: TerraWalletIDs | undefined;
  };

  type EthNetworks = "homestead" | "ropsten" | "bnb" | "bnbt";
}
