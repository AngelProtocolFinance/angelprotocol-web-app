import type { BankingApplicationStatus } from "types/applications";
export const status: Record<BankingApplicationStatus, string> = {
  rejected: "Rejected",
  "under-review": "Under Review",
  approved: "Approved",
};
