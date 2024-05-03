import type { BankingApplicationStatus } from "types/aws";
import type { OptionType } from "types/components";

export const statuses: OptionType<BankingApplicationStatus>[] = [
  { label: "Rejected", value: "rejected" },
  { label: "Under Review", value: "under-review" },
  { label: "Approved", value: "approved" },
];
