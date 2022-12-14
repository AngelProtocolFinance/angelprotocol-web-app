import { EncodeObject } from "@cosmjs/proto-signing";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { AsyncThunkAction, PayloadAction } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { Chain } from "types/aws";
import { WalletState } from "contexts/WalletContext";

export type Tag = TagDescription<string>;
export type TagPayload = PayloadAction<Tag[], string>;

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

export type Stage = InitialStage | SubmitStage | SuccessStage | ErrorStage;

export type Step = Stage["step"];

export type StageUpdater = (update: Stage) => void;

export type TxArgs = {
  tagPayloads?: TagPayload[];
  successMessage?: string;
  successLink?: SuccessLink;
  wallet: WalletState | undefined;
  msgs: EncodeObject[];
  onSuccess?(
    res: DeliverTxResponse,
    chain: Chain
  ): AsyncThunkAction<void, any, {}>;
};
