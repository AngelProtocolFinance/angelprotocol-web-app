declare module "@types-page/donations" {
  import { Transaction } from "@types-server/aws";
  type SortDirection = "asc" | "desc";
  type SortKey = keyof Omit<Transaction, "chain_id">;
}
