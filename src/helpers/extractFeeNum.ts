import { Fee } from "@terra-money/terra.js";
import { denoms } from "constants/currency";

export default function extractFeeNum(fee: Fee) {
  return fee.amount.get(denoms.uluna)!.div(1e6).amount.toNumber();
}
