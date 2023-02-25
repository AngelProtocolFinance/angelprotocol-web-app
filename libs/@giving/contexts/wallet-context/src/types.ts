import { chainIDs } from "@giving/constants/chains";
import { BaseChain } from "@giving/types/aws";
import { ProviderId } from "@giving/types/contexts/wallet";
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
  switchChain: (chainId: chainIDs) => Promise<void>;
};
