import { EncodeObject } from "@cosmjs/proto-signing";
import { PayloadAction } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { CreateTxOptions, Msg, TxInfo } from "@terra-money/terra.js";
import { KYCData } from "types/server/aws";
import { Tx } from "types/third-party/cosmjs";
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

export type SuccessLink = { url: string; description: string };
export type SuccessStage = {
  step: "success";
  message: string;
  txHash: string; //leave "" to not render tx link
  chainId: string; //leave "" to not render tx link
  txInfo?: TxInfo;
  rawLog?: string;
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
type WithMsg = BaseArgs & {
  msgs: Msg[];
  tx?: never;
}; //tx created onflight
type WithTx = BaseArgs & {
  msgs?: never;
  tx: CreateTxOptions;
}; //pre-estimated tx

export type TerraSendArgs = WithMsg | WithTx;

type _WithMsg = BaseArgs & {
  msgs: EncodeObject[];
  tx?: never;
};

type _WithTx = BaseArgs & {
  msgs?: never;
  tx: Tx;
};

export type SendCosmosTxArgs = _WithMsg | _WithTx;
