import type { BankingApplicationStatus } from "types/aws";
import type { OptionType } from "types/components";

export type FormValues = {
  endowmentID: string;
  status: OptionType<BankingApplicationStatus>;
};
