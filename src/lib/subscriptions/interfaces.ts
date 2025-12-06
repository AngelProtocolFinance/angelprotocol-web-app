import type { Environment } from "@better-giving/schemas";

export type TStatus = "active" | "inactive";
export type TStatusFlag = "0" | "1";
export type TPlatform = "stripe" | "paypal";
export type TInterval = "day" | "month" | "week" | "year";

export const to_flag = (status: TStatus): TStatusFlag => {
  // "0" is lexicographically before "1, but scan index forward : false "
  return status === "active" ? "1" : "0";
};
export const from_flag = (flag: TStatusFlag): TStatus => {
  return flag === "0" ? "inactive" : "active";
};

export interface ISub {
  id: string;
  /** unix */
  created_at: number;
  /** unix */
  updated_at: number;
  interval: TInterval;
  interval_count: number;

  /** unix */
  next_billing: number;
  amount: number;
  amount_usd: number;
  currency: string;
  product_id: string;
  /** npo-id (number), uuid (fund) */
  to_type: "npo" | "fund";
  to_id: string;
  to_name: string;

  platform: TPlatform;
  status: TStatus;
  status_cancel_reason?: string;
  env: Environment;

  /** email, */
  from_id: string;
}

export interface ISubUpdate extends Partial<Omit<ISub, "id">> {}
