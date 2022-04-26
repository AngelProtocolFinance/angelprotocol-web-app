import { Fee } from "@terra-money/terra.js";
import { Denoms } from "@types-lists";

export default function extractFeeNum(fee: Fee, denom: Denoms = "uusd") {
  return fee.amount.get(denom)!.mul(1e-6).amount.toNumber();
}
