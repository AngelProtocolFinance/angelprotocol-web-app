import { Transaction } from "types/server/aws";

export type SortDirection = "asc" | "desc";
export type SortKey = keyof Omit<Transaction, "chain_id">;
