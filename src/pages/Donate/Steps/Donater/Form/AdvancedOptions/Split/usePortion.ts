import { useFormContext } from "react-hook-form";
import { DonateValues } from "../../../types";
import { humanize } from "helpers";

export default function usePortion(type: string) {
  const isLocked = type === "locked";
  const { watch } = useFormContext<DonateValues>();
  const split_liq = Number(watch("liquidSplit"));
  const split_locked: number = 100 - split_liq;
  const token = watch("token");

  //values
  const disp_amount = `${token.symbol} ${humanize(
    ((isLocked ? split_locked : split_liq) / 100) * Number(token.amount),
    6
  )}`;

  return {
    disp_amount,
    disp_split: isLocked ? split_locked : split_liq,
  };
}
