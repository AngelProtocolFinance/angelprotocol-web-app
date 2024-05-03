import type { Keplr } from "@keplr-wallet/types";
import type { ConnectedWallet as TerraConnectedWallet } from "@terra-money/wallet-provider";
import type { ChainID } from "./chain";
import type { RequestArguments } from "./evm";

export type InjectedProviderID = "binance-wallet" | "metamask" | "xdefi-evm";
export type EVMWalletID = InjectedProviderID | "evm-wc";

export type TerraWalletID =
  | "station"
  | "walletconnect"
  | "leap-wallet"
  | "xdefi-wallet";

export type CosmostWalletID = "keplr" | "keplr-wc";
export type WalletID = EVMWalletID | TerraWalletID | CosmostWalletID;

/** connection state */
type ProviderConnected = {
  status: "connected";
  address: string;
  chainId: string; //chainId may not be one of supported chainIds
  isSwitching: boolean;
};

export type EVMConnected = ProviderConnected & {
  id: EVMWalletID;
  request: <T>(args: RequestArguments) => Promise<T>;
};

export type CosmosConnected = ProviderConnected & {
  id: CosmostWalletID;
  sign: Keplr["signDirect"];
};

type TerraConnected = ProviderConnected & {
  id: TerraWalletID;
  post: TerraConnectedWallet["post"];
};

type Disconnected = { status: "disconnected" };
type Loading = { status: "loading" };

export type Connector = { connect(...args: any[]): void };
type Disconnector = { disconnect(): void };
type ChainSwitcher = {
  switchChain: ((chainId: ChainID) => void) | null;
};

export type EVMProviderState = EVMConnected | Disconnected | Loading;
export type CosmosProviderState = CosmosConnected | Disconnected | Loading;
export type TerraProviderState = TerraConnected | Disconnected | Loading;

export type Connected = EVMConnected | CosmosConnected | TerraConnected;
export type WalletState =
  | (Connected & Disconnector & ChainSwitcher)
  | (Disconnected & Connector)
  | Loading;

export type WalletMeta = {
  logo: string;
  name: string;
  supportedChains: ChainID[];
};

export type Wallet = WalletMeta & WalletState;
export type ConnectedWallet = WalletMeta &
  Connected &
  Disconnector &
  ChainSwitcher;

export type DisconnectedWallet = WalletMeta & Disconnected & Connector;
export type WithWallet<T> = T & { wallet: ConnectedWallet };

const types: { [key in WalletID]: "cosmos" | "terra" | "evm" } = {
  "binance-wallet": "evm",
  "evm-wc": "evm",
  metamask: "evm",
  "xdefi-evm": "evm",
  keplr: "cosmos",
  "keplr-wc": "cosmos",
  station: "terra",
  walletconnect: "terra",
  "leap-wallet": "terra",
  "xdefi-wallet": "terra",
};

//type guards
export const isCosmos = (
  val: Connected | ConnectedWallet
): val is CosmosConnected => types[val.id] === "cosmos";

export const isEVM = (val: Connected | ConnectedWallet): val is EVMConnected =>
  types[val.id] === "evm";

export const isTerra = (
  val: Connected | ConnectedWallet
): val is TerraConnected => types[val.id] === "terra";
