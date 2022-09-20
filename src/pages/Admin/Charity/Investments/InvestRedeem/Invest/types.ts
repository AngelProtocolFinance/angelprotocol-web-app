import { AccountType } from "types/contracts";

export type Investment = {
  amount: number;
  vault: string;
  type: AccountType;
};

type Balance = { [key in AccountType]: number };

export type FormValues = {
  investments: Investment[];
  balance: Balance;
};
