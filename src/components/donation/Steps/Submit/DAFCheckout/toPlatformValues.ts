export interface AdjustedAmounts {
  amount: number;
  tip: number;
  feeAllowance: number;
}

export function toPlatformValues(
  /** amount provided by user in DAFPay form */
  actual: number,
  /** amounts provided by user in donation flow */
  platform: { amount: number; tip: number; feeAllowance: number }
): AdjustedAmounts {
  const platFormTotal = Object.values(platform).reduce((a, b) => a + b);
  const allowanceRate = platform.feeAllowance / platFormTotal;
  const tipRate = platform.tip / platFormTotal;

  const actualTip = actual * tipRate;
  const actualFeeAllowance = actual * allowanceRate;

  const actualAmount = actual - actualTip - actualFeeAllowance;

  return {
    amount: actualAmount,
    tip: actualTip,
    feeAllowance: actualFeeAllowance,
  };
}
