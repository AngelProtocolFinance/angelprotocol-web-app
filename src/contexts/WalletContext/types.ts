export type ProviderId = "binance-wallet" | "metamask" | "xdefi";
export type Connection = {
  logo: string;
  name: string;
  connect(): Promise<void>;
};
export type ProviderInfo = {
  providerId: ProviderId;
  logo: string;
  chainId: string;
  address: string;
};

type ProviderStatus = { providerInfo?: ProviderInfo; isLoading: boolean };
export type ProviderStatuses = ProviderStatus[];
