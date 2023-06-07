import { Token } from "types/aws";

type MetaToken = Pick<Token, "symbol" | "logo"> & { amount: number };

export type WithdrawMeta = {
  beneficiary: string;
  tokens: MetaToken[];
};

export type AccountStatusMeta = {
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

export type MultisigMemberMeta = {
  address: string;
  action: "add" | "remove";
};
