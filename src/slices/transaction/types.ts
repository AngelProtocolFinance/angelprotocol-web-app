import { PayloadAction } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { CreateTxOptions, Msg, TxInfo } from "@terra-money/terra.js";
import { ProviderId } from "contexts/WalletContext/types";

export type Tag = TagDescription<string>;
export type Tags = TagDescription<string>[];
export type TagPayload = PayloadAction<TagDescription<string>[], string>;
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

export type InitialStage = {
  step: "form";
  message?: never;
  txHash?: never;
  txInfo?: never;
  chainId?: never;
  details?: never;
};

export type SubmitStage = {
  step: "submit";
  message: string;
  txHash?: never;
  txInfo?: never;
  chainId?: never;
  details?: never;
};

export type BroadcastStage = {
  step: "broadcast";
  message: string;
  txHash: string;
  txInfo?: never;
  chainId: string;
  details?: never;
};

export type SuccessLink = { url: string; description: string };
export type SuccessStage = {
  step: "success";
  message: string;
  txHash: string; //leave "" to not render tx link
  txInfo?: TxInfo;
  chainId: string; //leave "" to not render tx link
  isReceiptEnabled?: boolean;
  isShareEnabled?: boolean;
  successLink?: SuccessLink;
};

export type ReceiptStage = {
  step: "receipt";
  message?: never;
  txHash: string;
  txInfo?: never;
  chainId: string;
};

export type ErrorStage = {
  step: "error";
  message: string;
  txHash?: string;
  txInfo?: never;
  chainId?: string;
  details?: never;
};

export type Stage =
  | InitialStage
  | SubmitStage
  | BroadcastStage
  | SuccessStage
  | ReceiptStage
  | ErrorStage;
export type StageUpdator = (update: Stage) => void;

type BaseArgs = {
  tagPayloads?: TagPayloads;
  successMessage?: string;
  successLink?: SuccessLink;
  providerId: ProviderId;
};
export type WithMsg = BaseArgs & {
  msgs: Msg[];
  tx?: never;
  feeBalance: number;
}; //tx created onflight
export type WithTx = BaseArgs & {
  msgs?: never;
  tx: CreateTxOptions;
  feeBalance?: never;
}; //pre-estimated tx

export type TerraSendArgs = WithMsg | WithTx;
