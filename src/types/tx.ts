import type { Any } from "@keplr-wallet/proto-types/google/protobuf/any";
import { Keplr } from "@keplr-wallet/types";
import type { CreateTxOptions, Msg } from "@terra-money/terra.js";
import type { ConnectedWallet as TerraConnectedWallet } from "@terra-money/wallet-provider";
import { Token } from "./aws";
import { ChainID, CosmosChainID, EVMChainID, TerraChainID } from "./chain";
import { Allowance, Transfer } from "./contracts/erc20";
import { SignDoc } from "./cosmos";
import { Requester, Tupleable } from "./evm";
import { EVMTx, SimulTx } from "./evm";

export type TokenWithAmount = Token & {
  amount: string;
};

// //////////// ESTIMATE TX ////////////
export type EstimateInput =
  | { chainID: CosmosChainID; val: Any[] }
  | { chainID: TerraChainID; val: Msg[] }
  | { chainID: EVMChainID; val: SimulTx };

// //////////// SEND TX ////////////

export type SubmittedTx = { hash: string; chainID: ChainID };

type TxLoading = { loading: string };
export type TxError = { error: string; tx?: SubmittedTx };
type TxSuccess = SubmittedTx;

export type TxResult = TxError | TxSuccess;

type Fee = { amount: number; symbol: string; coinGeckoId: string };

type CosmosEstimate = { chainID: CosmosChainID; toSend: SignDoc };
type EVMEstimate = { chainID: EVMChainID; toSend: EVMTx };
type TerraEstimate = { chainID: TerraChainID; toSend: CreateTxOptions };

export type EstimateResult = {
  fee: Fee;
} & (CosmosEstimate | EVMEstimate | TerraEstimate);

export type TxPackage = { sender: string } & (
  | (CosmosEstimate & { sign: Keplr["signDirect"] })
  | (TerraEstimate & {
      post: TerraConnectedWallet["post"];
    })
  | (EVMEstimate & { request: Requester })
);

// //////////// HOOK SENDER & PROMPT ////////////
type TxSuccessMeta = {
  message: string;
  link?: { url: string; description: string };
};

type SuccessState = { success: TxSuccessMeta; tx?: SubmittedTx };

export type TxState = TxLoading | TxError | SuccessState;

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
