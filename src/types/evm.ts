import { ethers } from "ethers";

export type {
  TransactionRequest,
  TransactionResponse,
} from "@ethersproject/abstract-provider";

export const { Contract: EVMContract, errors: EVMErrors } = ethers;
export const { Web3Provider, JsonRpcProvider } = ethers.providers;

/*** EIP1193 spec https://eips.ethereum.org/EIPS/eip-1193*/
//request
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
