import { AccountType } from "types/contracts";
import { TokenWithAmount } from "types/slices";

export type FormValues = {
  token: TokenWithAmount;

  type: AccountType;
  lockPeriod: 1 | 7 | 14; //days

  //meta
  tokens: TokenWithAmount[];
};
