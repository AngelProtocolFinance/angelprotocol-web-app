import type { TStatus } from "@better-giving/banking-applications";

export const status: Record<TStatus, string> = {
  rejected: "Rejected",
  "under-review": "Under Review",
  approved: "Approved",
};
