import { useFormContext } from "react-hook-form";
import { DonateValues } from "../../../types";
import { humanize } from "helpers";

export default function usePortion(type: string) {
  const isLocked = type === "locked";
  const { watch } = useFormContext<DonateValues>();
  const liquidSplit = Number(watch("liquidSplit"));
  const lockedSplit: number = 100 - liquidSplit;
  const token = watch("token");

  console.log(token);

  //values
  const disp_amount = `${token.symbol} ${humanize(
    ((isLocked ? lockedSplit : liquidSplit) / 100) * Number(token.amount),
    6
  )}`;

  return {
    disp_amount,
    disp_split: isLocked ? lockedSplit : liquidSplit,
  };
}
