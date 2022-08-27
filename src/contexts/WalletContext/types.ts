export type WalletId =
  | "binance-wallet"
  | "metamask"
  | "xdefi"
  | "xdefi-wallet" //xdefi terra provider
  | "xdefi-evm" //xdefi evm provider
  | "station"
  | "walletconnect"
  | "torus"
  | "keplr";

type Base = { id: WalletId; logo: string; name: string; network?: true };
type Single = { connect(args?: string): Promise<void>; networks?: never };
type Multi = { connect?: never; networks: Connection[] };
export type Connection = Base & (Single | Multi);

export type Wallet = {
  id: WalletId;
  logo: string;
  chainId: string;
  address: string;
};

export type WalletStatus = {
  wallet: Wallet | undefined;
  isLoading: boolean;
};
