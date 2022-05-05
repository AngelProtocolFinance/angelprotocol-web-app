import { Fee } from "@terra-money/terra.js";

export default function extractFeeNum(fee: Fee, denom: string = "uusd") {
  return fee.amount.get(denom)!.mul(1e-6).amount.toNumber();
}
