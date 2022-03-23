import { denoms } from "../constants/currency";
import { chainIDs } from "../constants/chainIDs";

export type WalletConnectionType = "metamask" | "terra";

export type Coin = {
  amount: number; // "1000"
  denom: denoms; //"denoms.uusd, denoms.uluna"
};

export type Wallet = {
  id?: string;
  icon: string;
  displayCoin: Coin;
  coins: Coin[];
  address: string;
  chainId: chainIDs;
  supported_denoms: denoms[];

  sendTransaction: (...args: any[]) => Promise<void>;
  sendDonation: (...args: any[]) => Promise<void>;
};
