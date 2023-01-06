import { BaseChain } from "types/aws";
import { chainIDs } from "constants/chains";
import { WalletState } from "./WalletContext";

export type WithWallet<T> = T & { wallet: WalletState };

export type ProviderId =
  | "binance-wallet"
  | "metamask"
  | "xdefi-wallet" //xdefi terra provider
  | "xdefi-evm" //xdefi evm provider
  | "leap-wallet"
  | "station"
  | "walletconnect"
  | "keplr-wc"
  | "keplr";

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
