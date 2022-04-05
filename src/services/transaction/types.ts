import { PayloadAction } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { CreateTxOptions, Msg } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { chainIDs } from "constants/chainIDs";
import { denoms } from "constants/currency";
import { tags as terraTags } from "services/terra/tags";
import { tags as awsTags } from "services/aws/tags";

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
  stage: Stage;
};

export type InitialStage = {
  step: Step.form;
  message?: never;
  txHash?: never;
  chainId?: never;
  details?: never;
};

export type SubmitStage = {
  step: Step.submit;
  message: string;
  txHash?: never;
  chainId?: never;
  details?: never;
};

export type BroadcastStage = {
  step: Step.broadcast;
  message: string;
  txHash: string;
  chainId: chainIDs;
  details?: never;
};

export type SuccessLink = { url: string; description: string };
export type SuccessStage = {
  step: Step.success;
  message: string;
  txHash: string;
  chainId: chainIDs;
  isReceiptEnabled?: boolean;
  isShareEnabled?: boolean;
  successLink?: SuccessLink;
};

export type ReceiptStage = {
  step: Step.receipt;
  message?: never;
  txHash: string;
  chainId: chainIDs;
};

export type ErrorStage = {
  step: Step.error;
  message: string;
  txHash?: string;
  chainId?: chainIDs;
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
  wallet: ConnectedWallet | undefined;
  tagPayloads?: PayloadAction<TagDescription<terraTags | awsTags>[], string>[];
  successMessage?: string;
  successLink?: SuccessLink;
  feedDenom?: denoms;
};
