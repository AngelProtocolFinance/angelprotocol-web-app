import { Fee } from "@terra-money/terra.js";
import { denoms } from "types/denoms";

export default function extractFeeNum(fee: Fee, denom = denoms.uusd) {
  return fee.amount.get(denom)!.mul(1e-6).amount.toNumber();
}
