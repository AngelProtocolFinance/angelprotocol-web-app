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

export type WalletSetters = {
  isLoading: boolean;
  isConnected: boolean;
  wallet: Wallet;
  connect: (...args: any[]) => Promise<void>;
  disconnect: () => Promise<void>;
};

export const DEFAULT_WALLET: Wallet = {
  address: "",
  chainId: chainIDs.mainnet,
  coins: [],
  displayCoin: { amount: 0, denom: denoms.uluna },
  icon: "",
  sendDonation: () => new Promise((r) => r),
  sendTransaction: () => new Promise((r) => r),
  supported_denoms: [],
};
