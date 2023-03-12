import type { KeplrWalletConnectV1 } from "@keplr-wallet/wc-client";
import type { ConnectedWallet as TerraConnectedWallet } from "@terra-money/wallet-provider";
import type { Keplr } from "@keplr-wallet/types";
import { InjectedProvider } from "types/evm";

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
  | "keplr";

/** connection state */
export type Connected = {
  status: "connected";
  address: string;
  chainId: string;
};
type Disconnected = { status: "disconnected" };
type Loading = { status: "loading" };

type Connector = { connect(args?: any): void };
type Disconnector = { disconnect(): void };

/** connection types */
type Terra = { type: "terra"; post: TerraConnectedWallet["post"] };

export type Cosmos = {
  type: "cosmos";
  client: Keplr | KeplrWalletConnectV1;
};
type EVM = {
  type: "evm";
  switchChain(chainId: string): Promise<void>;
  isSwitching: boolean;
  provider: InjectedProvider;
};

type EVMWC = {
  type: "evm-wc";
  switchChain?: never;
  isSwitching?: never;
  provider: Pick<InjectedProvider, "request">;
};

export type ConnectedToChainType = Connected & (Terra | EVM | EVMWC | Cosmos);
export type ProviderState = ConnectedToChainType | Disconnected | Loading;

export type WalletState =
  | (ConnectedToChainType & Disconnector)
  | (Disconnected & Connector)
  | Loading;

export type WalletMeta = {
  logo: string;
  id: ProviderId;
  name: string;
};

export type InstallLink = Pick<WalletMeta, "name" | "logo"> & {
  url: string;
};

export type Wallet = WalletMeta & WalletState;
export type ConnectedWallet = WalletMeta & ConnectedToChainType & Disconnector;
export type DisconnectedWallet = WalletMeta & Disconnected & Connector;

export type EVMWallet = ConnectedWallet & EVM;
export type EVMWCWallet = ConnectedWallet & EVMWC;
export type CosmosWallet = ConnectedWallet & Cosmos;
export type TerraWallet = ConnectedWallet & Terra;

export type ContextState =
  | "loading" /** consolidate all LoadingWallet*/
  | ConnectedWallet
  | DisconnectedWallet[];

export type WithWallet<T> = T & { wallet: ConnectedWallet };
export type WithCosmosWallet<T> = T & { wallet: CosmosWallet };
