import { CreateTxOptions, Msg } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import type { Any } from "@keplr-wallet/proto-types/google/protobuf/any";
import { Token } from "./aws";
import { Chain, ChainID } from "./chain";
import { Allowance, Transfer } from "./contracts/erc20";
import { SignDoc } from "./cosmos";
import { Tupleable } from "./evm";
import { EVMTx, LogProcessor, SimulTx } from "./evm";
import { TransactionStatus } from "./lists";

export type TokenWithBalance = Token & { balance: number };

export type TokenWithAmount = TokenWithBalance & {
  amount: string;
};

// //////////// SEND TX ////////////

export type EstimatedTx =
  | { type: "cosmos"; val: SignDoc; attribute?: string }
  | {
      type: "terra";
      val: CreateTxOptions;
      wallet: ConnectedWallet /**future client/provider will be included in wallet */;
    }
  | { type: "evm"; val: EVMTx; log?: LogProcessor };

export type SubmittedTx = { hash: string; chainID: ChainID };

type TxLoading = { loading: string };
export type TxError = { error: string; tx?: SubmittedTx };
type TxSuccess = SubmittedTx & { data: unknown };

export type TxResult = TxError | TxSuccess;

// //////////// ESTIMATE TX ////////////
export type TxContent =
  | { type: "cosmos"; val: Any[]; attribute?: string }
  | { type: "terra"; val: Msg[]; wallet: ConnectedWallet }
  | { type: "evm"; val: SimulTx; log?: LogProcessor };

type Fee = { amount: number; symbol: string; coinGeckoId: string };
export type Estimate = { fee: Fee; tx: EstimatedTx };

// //////////// HOOK SENDER & PROMPT ////////////
export type TxSuccessMeta = {
  message: string;
  link?: { url: string; description: string };
};

type SuccessState = { success: TxSuccessMeta; tx?: SubmittedTx };

export type TxState = TxLoading | TxError | SuccessState;
export type TxOnSuccess = (result: TxSuccess, chain: Chain) => void;

// //////////// TYPE GUARDS ////////////
export function isTxResultError(tx: TxResult): tx is TxError {
  return "error" in tx;
}
export function isTxError(tx: TxState): tx is TxError {
  return "error" in tx;
}
export function isTxSuccess(tx: TxState): tx is SuccessState {
  return "success" in tx;
}
export function isTxLoading(tx: TxState): tx is TxLoading {
  return "loading" in tx;
}

type Tx<T extends Tupleable> = {
  args: T;
};

export type ID = { id: number };

type Txs = {
  "erc20.transfer": Tx<Transfer>;
  "erc20.approve": Tx<Allowance>; //not multisig tx
};

export type TxType = keyof Txs;
export type TxArgs<T extends TxType> = Txs[T]["args"];

type Empty = { [key: string]: never };
export type TxOptions<T extends TxType> = T extends `${infer C}.${string}`
  ? Txs[T]["args"] & { [key in C]: string }
  : Empty;

export type Transaction = {
  transactionId: number;
  recordId: string;
  expiry: number;
  status: TransactionStatus;
  confirmations: string[];
  owners: string[];
};
