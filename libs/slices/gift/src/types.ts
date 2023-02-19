import { TokenWithAmount } from "@ap/types/slices";

export type GiftState = FormStep | SubmitStep | TxStep;

export type GiftDetails = {
  token: TokenWithAmount;
  recipient: string;

  //meta
  chainId: string;
  tokens: TokenWithAmount[];
};

export type FormStep = {
  step: 1;
  details?: GiftDetails;
};

export type SubmitStep = {
  step: 2;
} & Omit<Required<FormStep>, "step">;

export type TxResult = { hash: string };
export type GiftCard = { secret: string };
export type TLoading = { msg: string };
export type TError = { error: string };
export type TxStatus = TLoading | TError | TxResult | GiftCard;

export type TxStep = {
  step: 3;
  status: TxStatus;
} & Omit<SubmitStep, "step">;
