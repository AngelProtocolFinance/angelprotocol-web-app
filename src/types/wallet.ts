import { ChainID, ChainType } from "./chain";

export type ProviderId =
  | "binance-wallet"
  | "metamask"
  | "evm-wc"
  | "xdefi-wallet" //xdefi terra provider
  | "xdefi-evm" //xdefi evm provider
  | "leap-wallet"
  | "station"
  | "walletconnect"
  | "keplr-wc"
  | "keplr"
  | "web3auth-torus";

/** connection state */
export type Connected = {
  status: "connected";
  address: string;
  chainId: string; //chainId may not be one of supported chainIds
  isSwitchingChain: boolean;
};
type Disconnected = { status: "disconnected" };
type Loading = { status: "loading" };

export type Connector = { connect(...args: any[]): void };
type Disconnector = { disconnect(): void };
type ChainSwitcher = { switchChain: ((chainId: ChainID) => void) | null };

export type ProviderState = Connected | Disconnected | Loading;

export type WalletState =
  | (Connected & Disconnector & ChainSwitcher)
  | (Disconnected & Connector)
  | Loading;

export type WalletMeta = {
  type: ChainType;
  logo: string;
  id: ProviderId;
  name: string;
};

export type Wallet = WalletMeta & WalletState;
export type ConnectedWallet = WalletMeta &
  Connected &
  Disconnector &
  ChainSwitcher;

export type DisconnectedWallet = WalletMeta & Disconnected & Connector;
export type WithWallet<T> = T & { wallet: ConnectedWallet };
