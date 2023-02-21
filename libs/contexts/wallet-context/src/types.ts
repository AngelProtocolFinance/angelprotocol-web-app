import { chainIDs } from "@ap/constants";
import { ProviderId } from "@ap/types";
import { BaseChain, Chain, TokenWithBalance } from "@ap/types/aws";

export type WithWallet<T> = T & { wallet: WalletState };

export type WalletState = {
  walletIcon: string;
  displayCoin: TokenWithBalance;
  coins: TokenWithBalance[];
  address: string;
  chain: Chain;
  providerId: ProviderId;
  supportedChains: BaseChain[];
};

export type WithoutInstallers = Exclude<
  ProviderId,
  "station" | "walletconnect" | "leap-wallet"
>;

export type Connection = {
  logo: string;
  installUrl?: string;
  name: string;
  connect(args?: any): Promise<void>;
};

export type ProviderInfo = {
  providerId: ProviderId;
  logo: string;
  chainId: string;
  address: string;
};

export type ProviderStatus = {
  providerInfo?: ProviderInfo;
  isLoading: boolean;
  supportedChains: BaseChain[];
  switchChain: (chainId: chainIDs) => Promise<void>;
};
