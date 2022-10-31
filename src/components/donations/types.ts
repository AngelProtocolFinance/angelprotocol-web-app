import { Donation } from "types/aws";

export type SortDirection = "asc" | "desc";
export type SortKey = keyof Pick<
  Donation,
  "amount" | "date" | "chainName" | "charityName"
>;
