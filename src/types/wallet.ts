import { ChainID } from "./chain";

export type EVMWalletID =
  | "binance-wallet"
  | "metamask"
  | "xdefi-evm"
  | "evm-wc"
  | "web3auth-torus";

export type TerraWalletID =
  | "station"
  | "walletconnect"
  | "leap-wallet"
  | "xdefi-wallet";

export type CosmostWalletID = "keplr" | "keplr-wc";
export type WalletID = EVMWalletID | TerraWalletID | CosmostWalletID;

/** connection state */

export type Connected = {
  status: "connected";
  address: string;
  chainId: string; //chainId may not be one of supported chainIds
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
  logo: string;
  name: string;
};

export type Wallet = WalletMeta & WalletState;
export type ConnectedWallet = WalletMeta &
  Connected &
  Disconnector &
  ChainSwitcher;

export type DisconnectedWallet = WalletMeta & Disconnected & Connector;
export type WithWallet<T> = T & { wallet: ConnectedWallet };
