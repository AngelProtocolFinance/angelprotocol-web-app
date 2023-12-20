import { BankingApplicationStatus } from "types/aws";
import { OptionType } from "types/components";

export type FormValues = {
  endowmentID: string;
  status: OptionType<BankingApplicationStatus>;
};
