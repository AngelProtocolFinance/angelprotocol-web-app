import { SigningCosmWasmClient } from "types/cosmos";
import { JsonRpcSigner } from "types/evm";
import { TerraConnectedWallet } from "types/terra";

export type ProviderId =
  | "binance-wallet"
  | "metamask"
  | "xdefi-wallet" //xdefi terra provider
  | "xdefi-evm" //xdefi evm provider
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
  post: SigningCosmWasmClient["signAndBroadcast"];
};
type EVM = {
  type: "evm";
  signer: JsonRpcSigner;
  switchChain(chainId: string): void;
};

export type ConnectedToChainType = Connected & (Terra | Cosmos | EVM);

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

export type ContextState =
  | "loading" /** consolidate all LoadingWallet*/
  | ConnectedWallet
  | DisconnectedWallet[];
