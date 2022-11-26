export type ProviderId =
  | "binance-wallet"
  | "metamask"
  | "xdefi-wallet" //xdefi terra provider
  | "xdefi-evm" //xdefi evm provider
  | "leap-wallet"
  | "station"
  | "walletconnect"
  | "keplr-mobile"
  | "keplr";

export type WithoutInstallers = Exclude<
  ProviderId,
  "station" | "walletconnect" | "leap-wallet"
>;

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
