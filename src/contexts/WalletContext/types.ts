export type ProviderId =
  | "binance-wallet"
  | "metamask"
  | "xdefi-wallet" //xdefi terra provider
  | "xdefi-evm" //xdefi evm provider
  | "station"
  | "walletconnect"
  | "torus"
  | "unknown";

export type SingleConnection = {
  logo: string;
  name: string;
  connections?: never;
  connect(arg?: string): Promise<void>;
};

export type MultiConnection = {
  logo: string;
  name: string;
  connect?: never;
  connections: SingleConnection[];
};

export type Connection = SingleConnection | MultiConnection;

export type ProviderInfo = {
  providerId: ProviderId;
  logo: string;
  chainId: string;
  address: string;
};

type ProviderStatus = { providerInfo?: ProviderInfo; isLoading: boolean };
export type ProviderStatuses = ProviderStatus[];
