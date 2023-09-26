import { AWSstrategy } from "types/aws";
import { AccountType } from "types/lists";
import { TokenWithAmount } from "types/tx";

export type InvestorProps = {
  strategy: AWSstrategy;
  endowId: number;
};

export type FormValues = {
  token: TokenWithAmount;

  type: AccountType;
  lockPeriod: "1" | "7" | "14"; //days

  //meta
  tokens: TokenWithAmount[];
};

export type AccountBalances = { [key in AccountType]: number };
