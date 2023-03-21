import { BaseChain, ChainID } from "types/aws";
import { ProviderId } from "types/lists";
import { WalletState } from "./WalletContext";

export type WithWallet<T> = T & { wallet: WalletState };

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
  switchChain: (chainId: ChainID) => Promise<void>;
};
