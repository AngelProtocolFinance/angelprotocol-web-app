import { ethers } from "ethers";
import { Keplr } from "@keplr-wallet/types";

export interface Dwindow extends Window {
  xfi?: {
    ethereum?: InjectedProvider;
    terra?: any;
  };
  ethereum?: InjectedProvider;
  BinanceChain?: InjectedProvider;
  keplr?: Keplr;
}

export interface Web3Provider extends ethers.providers.Web3Provider {}

//FOR ADDING CHAIN
//specs: https://eips.ethereum.org/EIPS/eip-3085
export interface ChainParams {
  chainId: string;
  blockExplorerUrls?: string[];
  chainName?: string;
  iconUrls?: string[];
  nativeCurrency?: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls?: string[];
}

/*** EIP1193 spec https://eips.ethereum.org/EIPS/eip-1193*/
//request
interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

export type AccountChangeHandler = (accounts: string[]) => void;
export type ChainChangeHandler = (chainId: string) => void;

export type InjectedProvider = {
  isMetaMask: boolean;
  chainId: string;
  request: <T>(args: RequestArguments) => Promise<T>;
  on(ev: "chainChanged", listener: ChainChangeHandler): any;
  on(ev: "accountsChanged", listener: AccountChangeHandler): any;
  removeAllListeners(): unknown;
};
