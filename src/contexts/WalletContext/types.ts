export type ProviderId =
  | "binance-wallet"
  | "metamask"
  | "xdefi-wallet"
  | "station"
  | "wallet-connect"
  | "torus";

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
