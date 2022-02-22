import { ConnectedWallet } from "@terra-dev/wallet-types";
import { CreateTxOptions } from "@terra-money/terra.js";
import { DonateValues } from "components/Transactors/Donater/types";
import { DonationLogger } from "components/Transactors/Donater/useDonationLogger";
import { chainIDs } from "constants/chainIDs";

export enum Step {
  form = "form",
  submit = "submit",
  broadcast = "broadcast",
  success = "success",
  error = "error",
  receipt = "receipt",
}

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
  chainId: chainIDs;
  details?: never;
};

export type SuccessStage = {
  step: Step.success;
  message: string;
  txHash: string;
  chainId: chainIDs;
  isReceiptEnabled?: boolean;
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

export type DonateArgs = {
  tx: CreateTxOptions;
  wallet: ConnectedWallet | undefined;
  donateValues: DonateValues;
};
