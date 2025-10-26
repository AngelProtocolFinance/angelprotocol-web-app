import type { IAmounts } from "./types";

export function to_platform_values(
  /** amount provided by user in DAFPay form */
  actual: number,
  /** amounts provided by user in donation flow */
  platform: IAmounts
): IAmounts {
  const platform_total = Object.values(platform).reduce((a, b) => a + b);
  const allowance_rate = platform.fee_allowance / platform_total;
  const tip_rate = platform.tip / platform_total;

  const actual_tip = actual * tip_rate;
  const actual_fee_allowance = actual * allowance_rate;

  const actual_amount = actual - actual_tip - actual_fee_allowance;

  return {
    amount: actual_amount,
    tip: actual_tip,
    fee_allowance: actual_fee_allowance,
  };
}
