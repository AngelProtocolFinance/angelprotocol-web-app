import { AccountType } from "types/contracts";

export type Redeem = {
  amount: string;
  vault: string;
  balance: number;
  type: AccountType;
};

export type FormValues = {
  redeems: Redeem[];
  //meta,
  _redeems: any; //for validating whole redeems
};
