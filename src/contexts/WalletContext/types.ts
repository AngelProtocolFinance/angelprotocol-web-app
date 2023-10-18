import { BaseChain } from "types/aws";
import { ProviderId } from "types/lists";
import { chainIDs } from "constants/chains";
import { WalletState } from "./WalletContext";

export type WithWallet<T> = T & { wallet: WalletState };

export type WithoutInstallers = Exclude<
  ProviderId,
  "station" | "walletconnect" | "leap-wallet"
>;

export type Connection = {
  providerId: ProviderId;
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
