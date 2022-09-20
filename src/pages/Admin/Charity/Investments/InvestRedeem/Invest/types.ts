import { AccountType } from "types/contracts";

export type Investment = {
  amount: number;
  vault: string;
  type: AccountType;
};

export type Balance = { [key in AccountType]: number };

export type FormValues = {
  investments: Investment[];

  //meta
  balance: Balance;
  type: AccountType;
};
