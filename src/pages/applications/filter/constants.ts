import type { Status } from "@better-giving/registration/models";

export const statuses: { [status in Exclude<Status, "01">]: string } = {
  "04": "Rejected",
  "02": "Under Review",
  "03": "Approved",
};
