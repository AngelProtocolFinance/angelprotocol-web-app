import { AccountType } from "types/contracts";

export type Redeem = {
  amount: number;
  vault: string;
  balance: number;
};

export type FormValues = { [key in AccountType]: Redeem[] };
