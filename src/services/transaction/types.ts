import { PayloadAction } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { CreateTxOptions, Msg, TxInfo } from "@terra-money/terra.js";
import { tags as awsTags } from "services/aws/tags";
import { tags as terraTags } from "services/terra/tags";
import { WalletProxy } from "providers/WalletProvider/types";

export enum Step {
  form = "form",
  submit = "submit",
  broadcast = "broadcast",
  success = "success",
  error = "error",
  receipt = "receipt",
}

export type FormError =
  | {
      title: string;
      details?: string;
    }
  | string;

export type State = {
  form_loading: boolean;
  form_error: FormError | null;
  fee: number;
  feeSymbol?: string;
  stage: Stage;
};

export type InitialStage = {
  step: Step.form;
  message?: never;
  txHash?: never;
  txInfo?: never;
  chainId?: never;
  details?: never;
};

export type SubmitStage = {
  step: Step.submit;
  message: string;
  txHash?: never;
  txInfo?: never;
  chainId?: never;
  details?: never;
};

export type BroadcastStage = {
  step: Step.broadcast;
  message: string;
  txHash: string;
  txInfo?: never;
  chainId: string;
  details?: never;
};

export type SuccessLink = { url: string; description: string };
export type SuccessStage = {
  step: Step.success;
  message: string;
  txHash: string; //leave "" to not render tx link
  txInfo?: TxInfo;
  chainId: string; //leave "" to not render tx link
  isReceiptEnabled?: boolean;
  isShareEnabled?: boolean;
  successLink?: SuccessLink;
};

export type ReceiptStage = {
  step: Step.receipt;
  message?: never;
  txHash: string;
  txInfo?: never;
  chainId: string;
};

export type ErrorStage = {
  step: Step.error;
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
export type TagPayloads = PayloadAction<
  TagDescription<terraTags | awsTags>[],
  string
>[];

export type SenderArgs = {
  wallet: WalletProxy | undefined;
  tagPayloads?: TagPayloads;
  successMessage?: string;
  successLink?: SuccessLink;
  feeSymbol?: string;
};
