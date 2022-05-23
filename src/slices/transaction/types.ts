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

export type InitialStage = {
  step: "form";
  message?: never;
  txHash?: never;
  txInfo?: never;
  chainId?: never;
  details?: never;
};

export type SubmitStage = {
  step: "submit";
  message: string;
  txHash?: never;
  txInfo?: never;
  chainId?: never;
  details?: never;
};

export type BroadcastStage = {
  step: "broadcast";
  message: string;
  txHash: string;
  txInfo?: never;
  chainId: string;
  details?: never;
};

export type SuccessLink = { url: string; description: string };
export type SuccessStage = {
  step: "success";
  message: string;
  txHash: string; //leave "" to not render tx link
  txInfo?: any;
  chainId: string; //leave "" to not render tx link
  isReceiptEnabled?: boolean;
  isShareEnabled?: boolean;
  successLink?: SuccessLink;
};

export type ReceiptStage = {
  step: "receipt";
  message?: never;
  txHash: string;
  txInfo?: never;
  chainId: string;
};

export type ErrorStage = {
  step: "error";
  message: string;
  txHash?: string;
  txInfo?: never;
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
