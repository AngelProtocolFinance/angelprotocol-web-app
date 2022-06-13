import { PayloadAction } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { CreateTxOptions, Msg, TxInfo } from "@terra-money/terra.js";
import { ProviderId } from "contexts/WalletContext/types";
import { KYCData } from "types/server/aws";

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
 * - kycData
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
  kycData?: never;
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
  kycData?: never;
  txInfo?: TxInfo;
  isShareEnabled?: boolean;
  successLink?: SuccessLink;
};

export type ErrorStage = {
  step: "error";
  message: string;
  txHash?: string;
  chainId?: string;
  kycData?: never;
};

export type KYCStage = {
  step: "kyc";
  message?: never;
  txHash?: never;
  chainId?: never;
  kycData: KYCData;
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
  providerId: ProviderId;
};
type WithMsg = BaseArgs & {
  msgs: Msg[];
  tx?: never;
  feeBalance: number;
}; //tx created onflight
type WithTx = BaseArgs & {
  msgs?: never;
  tx: CreateTxOptions;
  feeBalance?: never;
}; //pre-estimated tx

export type TerraSendArgs = WithMsg | WithTx;
