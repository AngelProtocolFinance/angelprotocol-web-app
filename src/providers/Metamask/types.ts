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
  accountsChanged = "accountsChanged",
}

export enum EIP1193Methods {
  eth_requestAccounts = "eth_requestAccounts",
  //others
}

//event handler types
export type AccountChangeHandler = (accounts: string[]) => void;
