import { Fee } from "@terra-money/terra.js";
import { condenseToNum } from "./decimal";

export function extractFeeAmount(stdFee: Fee, denom: string): number {
  const stdFeeAmount = stdFee.amount.get(denom)!.amount;
  return condenseToNum(stdFeeAmount);
}
