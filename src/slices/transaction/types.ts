import { EncodeObject } from "@cosmjs/proto-signing";
import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { AsyncThunkAction, PayloadAction } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { CreateTxOptions, Msg } from "@terra-money/terra.js";
import { Chain, KYCData } from "types/server/aws";
import { ChainWallet } from "contexts/ChainGuard";

type Tag = TagDescription<string>;
export type Tags = Tag[];
export type TagPayload = PayloadAction<Tags, string>;
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

/**
 * BaseStage
 * - step
 * - message
 * - txhash
 * - chain
 */

export type InitialStage = {
  step: "initial";
  message?: never;
  txHash?: never;
  chain?: never;
  //re-start form with KYC data from receipter
  kycData?: KYCData;
};

export type SubmitStage = {
  step: "submit";
  message: string;
  txHash?: never;
  chain?: never;
};

export type BroadcastStage = {
  step: "broadcast";
  message: string;
  txHash: string;
  chain: Chain;
};

export type SuccessLink = { url: string; description: string };
export type SuccessStage = {
  step: "success";
  message: string;
  txHash: string; //leave "" to not render tx link
  chain: Chain; //leave "" to not render tx link
  rawLog?: string;
  isShareEnabled?: boolean;
  successLink?: SuccessLink;
};

export type ErrorStage = {
  step: "error";
  message: string;
  txHash?: string;
  chainId?: string;
  chain?: never;
};

export type KYCStage = {
  step: "kyc";
  message?: never;
  txHash?: never;
  chain?: never;
  kycData?: KYCData;
};

export type Stage =
  | InitialStage
  | KYCStage
  | SubmitStage
  | BroadcastStage
  | SuccessStage
  | ErrorStage;
export type StageUpdater = (update: Stage) => void;

type BaseArgs = {
  tagPayloads?: TagPayloads;
  successMessage?: string;
  successLink?: SuccessLink;
  wallet: ChainWallet;
  onSuccess?(
    res: DeliverTxResponse,
    wallet: ChainWallet
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

export type TxOptions = {
  msgs: EncodeObject[];
  fee: StdFee;
};

type CosmosWithMsg = BaseArgs & {
  msgs: EncodeObject[];
  tx?: never;
};

type CosmosWithTx = BaseArgs & {
  msgs?: never;
  tx: TxOptions;
};

export type SendCosmosTxArgs = CosmosWithMsg | CosmosWithTx;
