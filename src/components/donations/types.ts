import { Donation } from "types/aws";

export type SortDirection = "asc" | "desc";
export type SortKey = keyof Pick<
  Donation,
  "amount" | "date" | "chainName" | "charityName" | "usdValue"
>;

export type FilterFormValues = {
  startDate: string;
  endDate: string;
  network: string;
  currency: string;
};
