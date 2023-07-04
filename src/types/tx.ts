import { CreateTxOptions, Msg } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { OverrideProperties } from "type-fest";
import type { Any } from "@keplr-wallet/proto-types/google/protobuf/any";
import { FetchedChain, Token, TokenType } from "./aws";
import { SignDoc } from "./cosmos";
import { EVMTx, LogProcessor, SimulTx } from "./evm";
import { TagPayload } from "./third-party/redux";

export type TokenWithBalance = OverrideProperties<
  Token,
  { type: TokenType | "erc20-gift" | "evm-native-gift" }
> & { balance: number };

export type Chain = Omit<FetchedChain, "native_currency" | "tokens"> & {
  tokens: TokenWithBalance[];
  native_currency: TokenWithBalance;
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

export type SubmittedTx = { hash: string; chainID: string };

type TxLoading = { loading: string };
export type TxError = { error: string; tx?: SubmittedTx };
type TxSuccess = SubmittedTx & { data: unknown };

export type TxResult = TxError | TxSuccess;

// //////////// ESTIMATE TX ////////////
export type TxContent =
  | { type: "cosmos"; val: Any[]; attribute?: string }
  | { type: "terra"; val: Msg[]; wallet: ConnectedWallet }
  | { type: "evm"; val: SimulTx; log?: LogProcessor };

type Fee = { amount: number; symbol: string };
export type Estimate = { fee: Fee; tx: EstimatedTx };

// //////////// HOOK SENDER & PROMPT ////////////
export type TxSuccessMeta = {
  message: string;
  link?: { url: string; description: string };
};

type SuccessState = { success: TxSuccessMeta; tx?: SubmittedTx };

export type TxState = TxLoading | TxError | SuccessState;
export type TxOnSuccess = (result: TxSuccess, chain: Chain) => void;

export type SenderArgs = {
  tagPayloads?: TagPayload[];
  successMeta?: TxSuccessMeta;
  content: TxContent;
  onSuccess?: TxOnSuccess;
};

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
