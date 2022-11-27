import { ethers } from "ethers";
import { Keplr } from "@keplr-wallet/types";

export interface Dwindow extends Window {
  xfi?: {
    ethereum?: any;
    terra?: any;
  };
  ethereum?: any;
  BinanceChain?: any;
  keplr?: Keplr;
}

export interface Web3Provider extends ethers.providers.Web3Provider {}

/*** EIP1193 spec https://eips.ethereum.org/EIPS/eip-1193*/
interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

export type AccountChangeHandler = (accounts: string[]) => void;
export type ChainChangeHandler = (chainId: string) => void;

export type InjectedProvider = {
  chainId: string;
  request: <T>(args: RequestArguments) => Promise<T>;
  on(ev: "chainChanged", listener: ChainChangeHandler): any;
  on(ev: "accountsChanged", listener: AccountChangeHandler): any;
  removeAllListeners(): unknown;
};
