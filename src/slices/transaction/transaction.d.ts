declare module "@types-slice/transaction" {
  import { ChainIDs, Denoms } from "@types-lists";
  import { PayloadAction } from "@reduxjs/toolkit";
  import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
  import { CreateTxOptions, Msg } from "@terra-money/terra.js";
  import { WalletProxy } from "providers/WalletProvider/types";

  type Step = "form" | "submit" | "broadcast" | "success" | "error" | "receipt";

  type FormError =
    | {
        title: string;
        details?: string;
      }
    | string;

  type InitialStage = {
    step: "form";
    message?: never;
    txHash?: never;
    chainId?: ChainIDs;
    details?: never;
  };

  type SubmitStage = {
    step: "submit";
    message: string;
    txHash?: never;
    chainId?: ChainIDs;
    details?: never;
  };

  type BroadcastStage = {
    step: "broadcast";
    message: string;
    txHash: string;
    chainId: ChainIDs;
    details?: never;
  };

  type SuccessLink = { url: string; description: string };
  type SuccessStage = {
    step: "success";
    message: string;
    txHash: string;
    chainId: ChainIDs;
    isReceiptEnabled?: boolean;
    isShareEnabled?: boolean;
    successLink?: SuccessLink;
  };

  type ReceiptStage = {
    step: "receipt";
    message?: never;
    txHash: string;
    chainId: ChainIDs;
  };

  type ErrorStage = {
    step: "error";
    message: string;
    txHash?: string;
    chainId?: ChainIDs;
    details?: never;
  };

  type Stage =
    | InitialStage
    | SubmitStage
    | BroadcastStage
    | SuccessStage
    | ReceiptStage
    | ErrorStage;
  type StageUpdator = (update: Stage) => void;

  type WithMsg = { msgs: Msg[]; tx?: never }; //tx created onflight
  type WithTx = { msgs?: never; tx: CreateTxOptions }; //pre-estimated tx

  type SenderArgs = {
    wallet: WalletProxy | undefined;
    tagPayloads?: PayloadAction<TagDescription<string>[], string>[];
    successMessage?: string;
    successLink?: SuccessLink;
    feedDenom?: Denoms;
  };
}
