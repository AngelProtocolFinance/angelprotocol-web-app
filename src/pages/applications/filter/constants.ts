import type { TStatus } from "@better-giving/reg";

export const statuses: { [status in Exclude<TStatus, "01">]: string } = {
  "04": "Rejected",
  "02": "Under Review",
  "03": "Approved",
};
