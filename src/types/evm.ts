export { ErrorCode as EVMErrors } from "@ethersproject/logger";
export {
  JsonRpcProvider,
  Web3Provider,
  JsonRpcSigner,
} from "@ethersproject/providers";
export type {
  TransactionRequest,
  TransactionResponse,
} from "@ethersproject/providers";

export type { BigNumber } from "@ethersproject/bignumber";

export { Contract as EVMContract } from "@ethersproject/contracts";

// export const { Web3Provider, JsonRpcProvider } = ethers.providers;

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
  /** some wallets are not compliant to EIP1193 specs
   * Binance - no removeListener in window.BinanceChain
   */
  removeListener?(ev: "chainChanged", listener: ChainChangeHandler): any;
  removeListener?(ev: "accountsChanged", listener: AccountChangeHandler): any;
  removeAllListeners?: any;
};
