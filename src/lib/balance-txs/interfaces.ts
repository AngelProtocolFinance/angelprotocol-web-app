import type { IPageKeyed } from "@better-giving/types/api";
import * as v from "valibot";

/**
 * liq - savings
 * lock - investments
 * grant - to: withrawal
 * donation - from: deposit
 * interest - from: savings interest payout
 */
export type TAccount = "liq" | "lock" | "grant" | "donation" | "interest";
/**
 * pending - can be cancelled
 * final - manager approved this tx along with other txs. units deducted and payout record created. for donations, status = `final`
 * cancelled - manager cancelled this tx
 */

export const statuses = ["pending", "final", "cancelled"] as const;
export const status = v.picklist(statuses);
export type TStatus = v.InferOutput<typeof status>;

export interface IBalanceTx {
  id: string;
  date_created: string;
  date_updated: string;
  owner: string;
  account: TAccount;
  bal_begin: number;
  bal_end: number;
  /** e.g. $200 */
  amount: number;
  /** e.g. 100 units */
  amount_units: number;

  status: TStatus;

  account_other_id: string;
  account_other: TAccount;
  account_other_bal_begin: number;
  account_other_bal_end: number;
}
/**
 * add funds request - auto approved
 * transfer liq | lock
 *    - create balance tx, account liq
 *    - upon approval, create balance tx, account lock, - account liq as other
 * withdrawal
 *     - create balance tx, account liq/lock
 *     - upon approval, create balance tx, account other, - account liq/lock
 *
 */

export const limit_param = v.pipe(
  v.string(),
  v.transform((x) => +x),
  v.integer(),
  v.minValue(1)
);

export const page_options = v.object({
  next: v.optional(v.pipe(v.string(), v.base64())),
  limit: v.optional(limit_param),
});

export const balance_txs_options = v.object({
  ...page_options.entries,
  status: v.optional(status),
});

export interface IPageOptions extends v.InferOutput<typeof page_options> {}
export interface IBalanceTxsPageOptions
  extends v.InferOutput<typeof balance_txs_options> {
  source_acc?: TAccount;
}
export interface IBalanceTxsPage extends IPageKeyed<IBalanceTx> {}
