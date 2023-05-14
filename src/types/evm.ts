/** gas and gasPrice set by provider when presenting to user */

export type EVMTx = {
  //all prefixed-hex
  from: string;
  to: string;
  nonce: string;
  gas: string;
  gasPrice: string;
};

export type SimulSendNativeTx = Pick<
  EVMTx & { value: string },
  "from" | "to" | "value"
>;
export type SimulContractTx = Pick<
  EVMTx & { data: string },
  "from" | "to" | "data"
> & { value?: string };

export type SimulTx = SimulContractTx | SimulSendNativeTx;

export type LogProcessor = (logs: TxLog[]) => any;

/*** EIP1193 spec https://eips.ethereum.org/EIPS/eip-1193*/
export interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

type TxLog = {
  address: string;
  topics: string[];
  data: string;
};

export type TxReceipt = {
  logs: TxLog[];
  //add needed fields
};

export type AccountChangeHandler = (accounts: string[]) => void;
export type ChainChangeHandler = (chainId: string) => void;

export type InjectedProvider = {
  chainId?: string;
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

export type Primitives = number | string | boolean;
export type Tupleable = {
  [index: string]:
    | Primitives
    | Primitives[]
    | Tupleable
    | Tupleable[]
    | (Primitives | Tupleable)[];
  // | add future combination here
};

export type Tuple = (Primitives | Tuple)[];
