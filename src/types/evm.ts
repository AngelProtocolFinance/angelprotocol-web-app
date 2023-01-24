/** gas and gasPrice set by provider when presenting to user */

export type EVMTx = {
  //all prefixed-hex
  from: string;
  to: string;
  nonce: string;
};

export type SendNativeTx = EVMTx & {
  value: string; // funds
};
export type ContractTx = EVMTx & { data: string };

export type SimulSendNativeTx = Pick<SendNativeTx, "from" | "to" | "value">;
export type SimulContractTx = Pick<ContractTx, "from" | "to" | "data">;

/*** EIP1193 spec https://eips.ethereum.org/EIPS/eip-1193*/
export interface RequestArguments {
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

export type WCProvider = Pick<InjectedProvider, "request">;
