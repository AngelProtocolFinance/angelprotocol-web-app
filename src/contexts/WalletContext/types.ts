export type ProviderId =
  | "binance-wallet"
  | "metamask"
  | "xdefi" //xdefi evm provider
  | "unknown";

export type Connection = {
  logo: string;
  name: string;
  connect(arg?: string): Promise<void>;
};

export type ProviderInfo = {
  providerId: ProviderId;
  logo: string;
  chainId: string;
  address: string;
};

type ProviderStatus = { providerInfo?: ProviderInfo; isLoading: boolean };
export type ProviderStatuses = ProviderStatus[];
