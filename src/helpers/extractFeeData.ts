import { StdFee } from "@cosmjs/stargate";
import { Fee } from "@terra-money/terra.js";
import Decimal from "decimal.js";

type FeeData = {
  amount: number;
  denom: string;
};

export default function extractFeeData(
  stdFee: Fee | StdFee,
  denom: string
): FeeData {
  const amount = extractAmount(stdFee, denom);
  return { amount, denom };
}

function extractAmount(stdFee: Fee | StdFee, denom: string) {
  const stdFeeAmount =
    "gas" in stdFee
      ? stdFee.amount.find((a) => a.denom === denom)!.amount
      : stdFee.amount.get(denom)!.amount;
  const amount = new Decimal(stdFeeAmount).div(1e6).toNumber();
  return amount;
}
