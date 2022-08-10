import { StdFee } from "@cosmjs/stargate";
import { Fee } from "@terra-money/terra.js";
import Decimal from "decimal.js";

export default function extractFeeAmount(
  stdFee: Fee | StdFee,
  denom: string
): number {
  const stdFeeAmount =
    "gas" in stdFee
      ? stdFee.amount.find((a) => a.denom === denom)!.amount
      : stdFee.amount.get(denom)!.amount;
  const amount = new Decimal(stdFeeAmount).div(1e6).toNumber();
  return amount;
}
