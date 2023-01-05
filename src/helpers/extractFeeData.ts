import { StdFee } from "@cosmjs/stargate";
import { Fee } from "@terra-money/terra.js";
import { condenseToNum } from "./decimal";

export function extractFeeAmount(stdFee: Fee | StdFee, denom: string): number {
  const stdFeeAmount =
    "gas" in stdFee
      ? stdFee.amount.find((a) => a.denom === denom)!.amount
      : stdFee.amount.get(denom)!.amount;
  return condenseToNum(stdFeeAmount);
}
