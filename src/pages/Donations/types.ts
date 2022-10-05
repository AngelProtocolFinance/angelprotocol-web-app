import { Donation } from "types/aws";

export type DonationsParams = { address: string };
export type SortDirection = "asc" | "desc";
export type SortKey = keyof Pick<Donation, "amount" | "date">;
