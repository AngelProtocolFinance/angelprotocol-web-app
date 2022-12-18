import { StdFee } from "types/cosmos";
import { TerraFee } from "types/terra";
import { condenseToNum } from "./decimal";

export function extractFeeAmount(
  stdFee: TerraFee | StdFee,
  denom: string
): number {
  const stdFeeAmount =
    "gas" in stdFee
      ? stdFee.amount.find((a) => a.denom === denom)!.amount
      : stdFee.amount.get(denom)!.amount;
  return condenseToNum(stdFeeAmount);
}
