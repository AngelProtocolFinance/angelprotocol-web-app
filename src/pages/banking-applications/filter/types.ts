import type { BankingApplicationStatus } from "types/applications";
import type { OptionType } from "types/components";

export type FormValues = {
  endowmentID: string;
  status: OptionType<BankingApplicationStatus>;
};
