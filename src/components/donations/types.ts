import { Donation } from "types/aws";

export type SortDirection = "asc" | "desc";
export type SortKey = keyof Pick<
  Donation,
  "amount" | "date" | "chainName" | "charityName" | "usdValue"
>;

export type FilterFormValues = {
  startDate: Date;
  endDate: Date;
  network: string;
  currency: string;
};
