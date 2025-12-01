import type { Environment } from "@better-giving/schemas";

export type TStatus = "active" | "inactive";
export type TPlatform = "stripe" | "paypal";

export interface ISubs {
  id: string;
  /** unix */
  created_at: number;
  /** unix */
  updated_at: number;
  /** unix */
  next_billing: number;
  amount: number;
  curreny: string;
  product_id: string;
  /** npo-id (number), uuid (fund) */
  to_type: "npo" | "fund";
  to_id: string;
  to_name: string;

  platform: TPlatform;
  status: TStatus;
  env: Environment;

  /** email, */
  from_id: string;
}

export interface ISubsUpdate extends Partial<Omit<ISubs, "id">> {}
