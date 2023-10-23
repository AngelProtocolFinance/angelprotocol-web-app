import { ConnectedWallet as TerraConnectedWallet } from "@terra-money/wallet-provider";
import { Keplr } from "@keplr-wallet/types";
import { ChainID } from "./chain";
import { RequestArguments } from "./evm";

export type InjectedProviderID = "binance-wallet" | "metamask" | "xdefi-evm";
export type EVMWalletID = InjectedProviderID | "evm-wc" | "web3auth-torus";

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
type ChainSwitcher = { switchChain: ((chainId: ChainID) => void) | null };

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
};

export type Wallet = WalletMeta & WalletState;
export type ConnectedWallet = WalletMeta &
  Connected &
  Disconnector &
  ChainSwitcher;

export type DisconnectedWallet = WalletMeta & Disconnected & Connector;
export type WithWallet<T> = T & { wallet: ConnectedWallet };
