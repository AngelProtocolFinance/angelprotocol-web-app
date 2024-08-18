import type { Any } from "@keplr-wallet/proto-types/google/protobuf/any";
import type { Keplr } from "@keplr-wallet/types";
import type { CreateTxOptions, Msg } from "@terra-money/terra.js";
import type { ConnectedWallet as TerraConnectedWallet } from "@terra-money/wallet-provider";
import type { Token } from "./aws";
import type { Chain } from "./chain";
import type { TokenV2 } from "./components";
import type { Allowance, Transfer } from "./contracts/erc20";
import type { SignDoc } from "./cosmos";
import type { Requester, Tupleable } from "./evm";
import type { EVMTx, SimulTx } from "./evm";

export type TokenWithAmount = Token & {
  amount: string;
};

export interface TokenWithDetails extends TokenV2 {
  amount: string;
  min: number;
}

// //////////// ESTIMATE TX ////////////
export type EstimateInput =
  | { chainID: Chain.Id.Cosmos; val: Any[] }
  | { chainID: Chain.Id.Terra; val: Msg[] }
  | { chainID: Chain.Id.EVM; val: SimulTx };

// //////////// SEND TX ////////////

export type SubmittedTx = { hash: string; chainID: Chain.Id.All };

type TxLoading = { loading: string };
export type TxError = { error: string; tx?: SubmittedTx };
type TxSuccess = SubmittedTx;

export type TxResult = TxError | TxSuccess;

type Fee = { amount: number; symbol: string; coinGeckoId: string };

type CosmosEstimate = { chainID: Chain.Id.Cosmos; toSend: SignDoc };
type EVMEstimate = { chainID: Chain.Id.EVM; toSend: EVMTx };
type TerraEstimate = { chainID: Chain.Id.Terra; toSend: CreateTxOptions };

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
