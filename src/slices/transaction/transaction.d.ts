declare module "@types-slice/transaction" {
  import { PayloadAction } from "@reduxjs/toolkit";
  import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
  import { CreateTxOptions, Msg, TxInfo } from "@terra-money/terra.js";
  import { WalletProxy } from "providers/WalletProvider/types";

  type Tag = TagDescription<string>;
  type Tags = TagDescription<string>[];
  type TagPayload = PayloadAction<TagDescription<string>[], string>;
  type TagPayloads = TagPayload[];
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
    txInfo?: never;
    chainId?: never;
    details?: never;
  };

  type SubmitStage = {
    step: "submit";
    message: string;
    txHash?: never;
    txInfo?: never;
    chainId?: never;
    details?: never;
  };

  type BroadcastStage = {
    step: "broadcast";
    message: string;
    txHash: string;
    txInfo?: never;
    chainId: string;
    details?: never;
  };

  type SuccessLink = { url: string; description: string };
  type SuccessStage = {
    step: "success";
    message: string;
    txHash: string; //leave "" to not render tx link
    txInfo?: TxInfo;
    chainId: string; //leave "" to not render tx link
    isReceiptEnabled?: boolean;
    isShareEnabled?: boolean;
    successLink?: SuccessLink;
  };

  type ReceiptStage = {
    step: "receipt";
    message?: never;
    txHash: string;
    txInfo?: never;
    chainId: string;
  };

  type ErrorStage = {
    step: "error";
    message: string;
    txHash?: string;
    txInfo?: never;
    chainId?: string;
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
    tagPayloads?: TagPayloads;
    successMessage?: string;
    successLink?: SuccessLink;
    feeSymbol?: string;
  };
}
