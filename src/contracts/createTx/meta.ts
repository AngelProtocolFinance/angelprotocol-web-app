import { Token } from "types/aws";
import { EndowmentStatusText } from "types/contracts";

type MetaToken = Pick<Token, "symbol" | "logo"> & { amount: number };

export type WithdrawMeta = {
  beneficiary: string;
  tokens: MetaToken[];
};

export type AccountStatusMeta = {
  from: EndowmentStatusText;
  to: EndowmentStatusText;
  beneficiary: string; //endow id: .. | index fund: .. |
};

export type ThresholdMeta = {
  curr: number;
  new: number;
};

export type OwnerMeta = {
  curr: string;
  new: string;
};

export type TransferMeta = {
  to: string;
  token: MetaToken;
};
