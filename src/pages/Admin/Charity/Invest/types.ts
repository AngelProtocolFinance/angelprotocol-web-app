import { AWSstrategy } from "types/aws";
import { AccountType } from "types/lists";
import { TokenWithAmount } from "types/tx";

export type InvestFormValues = {
  token: TokenWithAmount;
  accountType: AccountType;
  lockPeriod: "1" | "7" | "14"; //days

  //meta
  tokens: TokenWithAmount[];
};

export type InvestorProps = {
  strategy: AWSstrategy;
  endowId: number;
  initialFormValues?: InvestFormValues;
};

export type AccountBalances = { [key in AccountType]: number };

export type SummaryProps = InvestFormValues & AWSstrategy;
