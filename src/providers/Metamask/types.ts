import { ethers } from "ethers";

export interface Ethereum extends ethers.providers.Web3Provider {}

export interface IMetamaskState {
  loading: boolean;
  connected: boolean;
  address: string | null;
}

export type Setters = {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
};

//ethereum object definitions
//from https://eips.ethereum.org/EIPS/eip-1193
export enum EIP1193Events {
  connect = "connect",
  disconnect = "disconnect",
  chainChanged = "chainChanged",
  accountsChanged = "accountsChanged",
  message = "message",
}

export enum EIP1193Methods {
  eth_requestAccounts = "eth_requestAccounts",
  //others
}

interface ProviderConnectInfo {
  readonly chainId: string;
}

interface ProviderMessage {
  readonly type: string;
  readonly data: unknown;
}

interface ProviderConnectInfo {
  readonly chainId: string;
}

interface ProviderRpcError extends Error {
  code: number;
  data?: unknown;
}

//event handler types
export type AccountChangeHandler = (accounts: string[]) => void;
export type ChainChangeHandler = (chainId: string) => void;
export type ConnectHandler = (connectInfo: ProviderConnectInfo) => void;
export type DisconnectHandler = (error: ProviderRpcError) => void;
export type MessageHandler = (message: ProviderMessage) => void;
