import { denoms } from "constants/currency";

export enum Step {
  form = "form",
  submit = "submit",
  broadcast = "broadcast",
  success = "success",
  error = "error",
  receipt = "receipt",
}

export type Details = {
  amount: string;
  receiver: string | number;
  split_liq: string;
  denom: denoms;
};

export type State = {
  form_loading: boolean;
  form_error: string;
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
  chainId: string;
  details?: never;
};

export type SuccessStage = {
  step: Step.success;
  message: string;
  txHash: string;
  chainId: string;
  details?: Details;
};

export type ReceiptStage = {
  step: Step.receipt;
  message?: never;
  txHash: string;
  chainId: string;
  details: Details;
};

export type ErrorStage = {
  step: Step.error;
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
