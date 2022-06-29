import { StdFee } from "@cosmjs/stargate";
import Decimal from "decimal.js";
import { MAIN_DENOM } from "constants/currency";

export default function extractFeeNum(fee: StdFee): number {
  return new Decimal(fee.amount.find((a) => a.denom === MAIN_DENOM)!.amount)
    .div(1e6)
    .toNumber();
}
