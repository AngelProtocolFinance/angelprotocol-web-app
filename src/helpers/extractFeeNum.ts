import { Fee } from "@terra-money/terra.js";
import { denoms } from "constants/currency";

export default function extractFeeNum(fee: Fee, denom: string = denoms.uusd) {
  return fee.amount.get(denom)!.mul(1e-6).amount.toNumber();
}
