import type { BankingApplicationStatus } from "types/applications";
import type { OptionType } from "types/components";

export const statuses: OptionType<BankingApplicationStatus>[] = [
  { label: "Rejected", value: "rejected" },
  { label: "Under Review", value: "under-review" },
  { label: "Approved", value: "approved" },
];
