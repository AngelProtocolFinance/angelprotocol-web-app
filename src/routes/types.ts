import { type InferOutput, picklist } from "valibot";
export { parse } from "valibot";

export const stage = picklist(["staging", "production"]);
export type Stage = InferOutput<typeof stage>;

export interface DonationMessageParams {
  date: string;
  donor_id: string;
  donor_message: string;
  donor_name: string;
  recipient_id: string;
  transaction_id: string;
  usd_value: number;
}
