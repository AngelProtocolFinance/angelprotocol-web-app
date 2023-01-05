import { PayloadAction } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

export type Tag = TagDescription<string>;
export type TagPayload = PayloadAction<Tag[], string>;
export type Step = "form" | "submit" | "broadcast" | "success" | "error";

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
  rawLog?: string;
  successLink?: SuccessLink;
};

export type ErrorStage = {
  step: "error";
  message: string;
  //supply these two if want to show tx link
  txHash?: string;
  chainId?: string;
};

export type Stage =
  | InitialStage
  | SubmitStage
  | BroadcastStage
  | SuccessStage
  | ErrorStage;
export type StageUpdater = (update: Stage) => void;
