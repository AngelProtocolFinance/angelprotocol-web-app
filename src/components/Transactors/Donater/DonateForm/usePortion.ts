import { useFormContext } from "react-hook-form";
import { DonateValues } from "../types";
import { toCurrency } from "helpers";

export default function usePortion(type: string) {
  const isLocked = type === "locked";
  const { watch } = useFormContext<DonateValues>();
  const split_liq = Number(watch("split_liq"));
  const split_locked: number = 100 - split_liq;
  const amount = Number(watch("amount")) || 0;
  const token = watch("token");

  //values
  const disp_amount = `${token.symbol} ${toCurrency(
    ((isLocked ? split_locked : split_liq) / 100) * amount,
    6
  )}`;

  return {
    disp_amount,
    disp_split: isLocked ? split_locked : split_liq,
  };
}
