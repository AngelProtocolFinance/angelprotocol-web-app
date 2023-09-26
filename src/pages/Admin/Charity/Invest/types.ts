import { AWSstrategy } from "types/aws";
import { AccountType } from "types/lists";
import { TokenWithAmount } from "types/tx";

export type InvestFormValues = {
  token: TokenWithAmount;

  type: AccountType;
  lockPeriod: "1" | "7" | "14"; //days

  //meta
  tokens: TokenWithAmount[];
};

export type AccountBalances = { [key in AccountType]: number };

export type SummaryProps = Pick<InvestFormValues, "token" | "type"> &
  AWSstrategy;
