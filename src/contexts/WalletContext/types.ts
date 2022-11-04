import { WalletState } from "./WalletContext";

export type WithWallet<T> = T & { wallet: WalletState };

export type ProviderId =
  // | "binance-wallet"
  | "metamask"
  | "xdefi-wallet" //xdefi terra provider
  | "xdefi-evm" //xdefi evm provider
  | "leap-wallet"
  | "falcon-wallet"
  | "bitkeep-wallet"
  | "station"
  | "walletconnect"
  | "keplr";

type Base = {
  logo: string;
  installUrl?: string;
  name: string;
  network?: true;
};
type Single = { connect(args?: string): Promise<void>; networks?: never };
type Multi = { connect?: never; networks: Connection[] };
export type Connection = Base & (Single | Multi);

export type ProviderInfo = {
  providerId: ProviderId;
  logo: string;
  chainId: string;
  address: string;
};

type ProviderStatus = { providerInfo?: ProviderInfo; isLoading: boolean };
export type ProviderStatuses = ProviderStatus[];
