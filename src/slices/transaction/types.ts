import { EncodeObject } from "@cosmjs/proto-signing";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { AsyncThunkAction, PayloadAction } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { CreateTxOptions, Msg } from "@terra-money/terra.js";
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

type TerraWithMsg = BaseArgs & {
  msgs: Msg[];
  tx?: never;
}; //tx created onflight
type TerraWithTx = BaseArgs & {
  msgs?: never;
  tx: CreateTxOptions;
}; //pre-estimated tx

export type TerraSendArgs = TerraWithMsg | TerraWithTx;

type CosmosWithMsg = BaseArgs & {
  msgs: EncodeObject[];
  tx?: never;
};

type CosmosWithTx = BaseArgs & {
  msgs?: never;
  tx: TxOptions;
};

export type SendCosmosTxArgs = CosmosWithMsg | CosmosWithTx;
