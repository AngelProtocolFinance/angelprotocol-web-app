import { Fee } from "@terra-money/terra.js";
import { denoms } from "constants/currency";

export default function extractFeeData(fee: Fee, denom = denoms.uusd) {
  return {
    amount: fee.amount.get(denom)!.mul(1e-6).amount.toNumber(),
    denom,
  };
}
