import { PayloadAction } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { CreateTxOptions, Msg } from "@terra-money/terra.js";
import { WalletProxy } from "providers/WalletProvider/types";

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
  chainId?: never;
  details?: never;
};

export type SubmitStage = {
  step: "submit";
  message: string;
  txHash?: never;
  chainId?: never;
  details?: never;
};

export type BroadcastStage = {
  step: "broadcast";
  message: string;
  txHash: string;
  chainId: string;
  details?: never;
};

export type SuccessLink = { url: string; description: string };
export type SuccessStage = {
  step: "success";
  message: string;
  txHash: string;
  chainId: string;
  isReceiptEnabled?: boolean;
  isShareEnabled?: boolean;
  successLink?: SuccessLink;
};

export type ReceiptStage = {
  step: "receipt";
  message?: never;
  txHash: string;
  chainId: string;
};

export type ErrorStage = {
  step: "error";
  message: string;
  txHash?: string;
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
  wallet: WalletProxy | undefined;
  tagPayloads?: PayloadAction<TagDescription<string>[], string>[];
  successMessage?: string;
  successLink?: SuccessLink;
  feedDenom?: string;
};
