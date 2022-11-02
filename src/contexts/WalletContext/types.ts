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
type Single = {
  connect: () => Promise<void>;
  networks?: never;
  providerId: ProviderId;
};
type Multi = { connect?: never; networks: Connection[]; providerId?: never };
export type Connection = Base & (Single | Multi);

export type ProviderInfo = {
  providerId: ProviderId;
  logo: string;
  chainId: string;
  address: string;
};

export type WalletData = {
  connections: Connection[];
  disconnect: () => void;
  providerInfo?: ProviderInfo;
  isLoading: boolean;
};
