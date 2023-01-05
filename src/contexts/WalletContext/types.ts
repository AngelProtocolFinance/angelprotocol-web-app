import type { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import type { JsonRpcSigner } from "@ethersproject/providers";
import { ConnectedWallet as TerraConnectedWallet } from "@terra-money/wallet-provider";

export type ProviderId =
  | "binance-wallet"
  | "metamask"
  | "xdefi-wallet" //xdefi terra provider
  | "xdefi-evm" //xdefi evm provider
  | "leap-wallet"
  | "station"
  | "walletconnect"
  | "keplr";

type Connected = {
  status: "connected";
  address: string;
  chainId: string;
  disconnect(): void;
};

type Terra = { type: "terra"; post: TerraConnectedWallet["post"] };
type Cosmos = {
  type: "cosmos";
  client: SigningCosmWasmClient;
};
type EVM = {
  type: "evm";
  signer: JsonRpcSigner;
  switchChain(chainId: string): Promise<void>;
  isSwitching: boolean;
};

export type ConnectedToChainType = Connected & (Terra | EVM | Cosmos);

type Disconnected = { status: "disconnected"; connect(args?: any): void };
type Loading = { status: "loading" };

export type WalletState = ConnectedToChainType | Disconnected | Loading;
export type WalletMeta = {
  logo: string;
  id: ProviderId;
  name: string;
};
export type Wallet = WalletMeta & WalletState;

export type ConnectedWallet = WalletMeta & ConnectedToChainType;
export type DisconnectedWallet = WalletMeta & Disconnected;

type BaseWallet = Connected & WalletMeta;
export type EVMWallet = BaseWallet & EVM;
export type CosmosWallet = BaseWallet & Cosmos;
export type TerraWallet = BaseWallet & Terra;

export type ContextState =
  | "loading" /** consolidate all LoadingWallet*/
  | ConnectedWallet
  | DisconnectedWallet[];

export type WithWallet<T> = T & { wallet: ConnectedWallet };
export type WithCosmosWallet<T> = T & { wallet: CosmosWallet };
