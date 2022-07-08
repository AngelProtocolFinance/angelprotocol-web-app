import { EncodeObject } from "@cosmjs/proto-signing";
import { StdFee } from "@cosmjs/stargate";
import { PayloadAction } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { CreateTxOptions, Msg } from "@terra-money/terra.js";
import { KYCData } from "types/server/aws";
import { WalletState } from "contexts/WalletContext/WalletContext";

type Tag = TagDescription<string>;
export type Tags = Tag[];
export type TagPayload = PayloadAction<Tags, string>;
export type TagPayloads = TagPayload[];
export type Step =
  | "form"
  | "submit"
  | "broadcast"
  | "success"
  | "error"
  | "receipt";

export type FormError =
  | {
      title: string;
      details?: string;
    }
  | string;

/**
 * BaseStage
 * - step
 * - message
 * - txhash
 * - chainId
 */

export type InitialStage = {
  step: "initial";
  message?: never;
  txHash?: never;
  chainId?: never;
  //re-start form with KYC data from receipter
  kycData?: KYCData;
};

export type SubmitStage = {
  step: "submit";
  message: string;
  txHash?: never;
  chainId?: never;
};

export type BroadcastStage = {
  step: "broadcast";
  message: string;
  txHash: string;
  chainId: string;
};

type Attribute = {
  key: string;
  value: string;
};
type Event = {
  type: string;
  attributes: Attribute[];
};
// This is a wrapper for @cosmjs/stargate/build/logs > Log as setting the cosmjs version of Log (which is readonly)
// in the transactionSlice.setStage causes an error with setting an immutable type into a mutable variable
export type Log = {
  msg_index: number;
  log: string;
  events: Event[];
};

export type SuccessLink = { url: string; description: string };
export type SuccessStage = {
  step: "success";
  message: string;
  txHash: string; //leave "" to not render tx link
  chainId: string; //leave "" to not render tx link
  logs?: Log[];
  isShareEnabled?: boolean;
  successLink?: SuccessLink;
};

export type ErrorStage = {
  step: "error";
  message: string;
  txHash?: string;
  chainId?: string;
};

export type KYCStage = {
  step: "kyc";
  message?: never;
  txHash?: never;
  chainId?: never;
  kycData?: KYCData;
};

export type Stage =
  | InitialStage
  | KYCStage
  | SubmitStage
  | BroadcastStage
  | SuccessStage
  | ErrorStage;
export type StageUpdator = (update: Stage) => void;

type BaseArgs = {
  tagPayloads?: TagPayloads;
  successMessage?: string;
  successLink?: SuccessLink;
  wallet?: WalletState;
};
type TerraWithMsg = BaseArgs & {
  msgs: Msg[];
  tx?: never;
}; //tx created onflight
type TerraWithTx = BaseArgs & {
  msgs?: never;
  tx: CreateTxOptions;
}; //pre-estimated tx

export type TerraSendArgs = TerraWithMsg | TerraWithTx;

export type TxOptions = {
  msgs: EncodeObject[];
  fee: StdFee;
};

type CosmosWithMsg = BaseArgs & {
  msgs: EncodeObject[];
  tx?: never;
};

type CosmosWithTx = BaseArgs & {
  msgs?: never;
  tx: TxOptions;
};

export type SendCosmosTxArgs = CosmosWithMsg | CosmosWithTx;
