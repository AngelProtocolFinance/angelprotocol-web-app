import { EncodeObject } from "@cosmjs/proto-signing";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { AsyncThunkAction, PayloadAction } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { Chain } from "types/aws";
import { TxOptions } from "types/slices";
import { WalletState } from "contexts/WalletContext";

export type Tag = TagDescription<string>;
export type TagPayload = PayloadAction<Tag[], string>;
export type Step = "form" | "submit" | "broadcast" | "success" | "error";

export type FormError =
  | {
      title: string;
      details?: string;
    }
  | string;

export type Tx = { hash: string; chainID: string; rawLog?: string };

export type InitialStage = {
  step: "initial";
  tx?: never;
};

export type SubmitStage = {
  step: "submit";
  message: string;
  tx?: never;
};

export type BroadcastStage = {
  step: "broadcast";
  message: string;
  tx: Tx;
};

export type SuccessLink = { url: string; description: string };
export type SuccessStage = {
  step: "success";
  message: string;
  tx: Tx;
  successLink?: SuccessLink;
};

export type ErrorStage = {
  step: "error";
  message: string;
  tx?: Tx;
};

export type Stage =
  | InitialStage
  | SubmitStage
  | BroadcastStage
  | SuccessStage
  | ErrorStage;

export type StageUpdater = (update: Stage) => void;

type BaseArgs = {
  tagPayloads?: TagPayload[];
  successMessage?: string;
  successLink?: SuccessLink;
  wallet: WalletState | undefined;
  onSuccess?(
    res: DeliverTxResponse,
    chain: Chain
  ): AsyncThunkAction<void, any, {}>;
};

type WithMsg = BaseArgs & {
  msgs: EncodeObject[];
  tx?: never;
};

type WithTx = BaseArgs & {
  msgs?: never;
  tx: TxOptions;
};

export type TxArgs = WithMsg | WithTx;
