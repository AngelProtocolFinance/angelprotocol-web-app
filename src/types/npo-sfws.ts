import type { BalanceTx } from "@better-giving/balance-tx";
export interface Item
  extends Omit<BalanceTx.SFW.DBRecord, "PK" | "SK" | "change" | "pct_change"> {}

export interface SfwPage {
  all: Item[];
  twr: number;
}
