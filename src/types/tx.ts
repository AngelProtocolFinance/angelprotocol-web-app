import { EncodeObject } from "@cosmjs/proto-signing";
import { StdFee } from "@cosmjs/stargate";
import { CreateTxOptions, Msg } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { Chain } from "./aws";
import { EVMTx, LogProcessor, SimulTx } from "./evm";
import { TagPayload } from "./third-party/redux";

// //////////// SEND TX ////////////
export type CosmosTx = {
  msgs: EncodeObject[];
  fee: StdFee;
};

export type EstimatedTx =
  | { type: "cosmos"; val: CosmosTx; attribute?: string }
  | {
      type: "terra";
      val: CreateTxOptions;
      wallet: ConnectedWallet /**future client/provider will be included in wallet */;
    }
  | { type: "evm"; val: EVMTx; log?: LogProcessor };

export type SubmittedTx = { hash: string; chainID: string };

export type TxLoading = { loading: string };
export type TxError = { error: string; tx?: SubmittedTx };
export type TxSuccess = SubmittedTx & {
  attrValue?: any;
  rawLog?: string /**TODO: remove once useCosmosTxSender is repurposed to a general useTxSender */;
};

export type TxResult = TxError | TxSuccess;

// //////////// ESTIMATE TX ////////////
export type TxContent =
  | { type: "cosmos"; val: EncodeObject[]; attribute?: string }
  | { type: "terra"; val: Msg[]; wallet: ConnectedWallet }
  | { type: "evm"; val: SimulTx; log?: LogProcessor };

export type Fee = { amount: number; symbol: string };
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
  isAuthorized?: boolean;
  msgs: EncodeObject[];
  onSuccess?(result: TxSuccess, chain: Chain): void;
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
