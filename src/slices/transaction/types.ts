import { PayloadAction } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { CreateTxOptions, Msg, TxInfo } from "@terra-money/terra.js";
import { Wallet } from "@terra-money/wallet-provider";

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

export type WithMsg = { msgs: Msg[]; tx?: never }; //tx created onflight
export type WithTx = { msgs?: never; tx: CreateTxOptions }; //pre-estimated tx

export type SenderArgs = {
  tagPayloads?: TagPayloads;
  successMessage?: string;
  successLink?: SuccessLink;
  feeSymbol?: string;
};
