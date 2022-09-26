import { Transaction } from "types/aws";

export type SortDirection = "asc" | "desc";
export type SortKey = keyof Omit<Transaction, "chain_id">;
