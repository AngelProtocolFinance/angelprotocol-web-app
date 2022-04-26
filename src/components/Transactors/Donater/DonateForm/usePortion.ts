import { DonateValues } from "@types-component/donater";
import { useFormContext } from "react-hook-form";
import toCurrency from "helpers/toCurrency";
import { currency_text } from "constants/currency";
import { decimals } from "../constants";

export default function usePortion(type: string) {
  const isLocked = type === "locked";
  const { watch } = useFormContext<DonateValues>();
  const split_liq = Number(watch("split_liq"));
  const split_locked: number = 100 - split_liq;
  const amount = Number(watch("amount")) || 0;
  const currency = watch("currency");

  //values
  const precision = decimals[currency];
  const disp_amount = `${currency_text[currency]} ${toCurrency(
    ((isLocked ? split_locked : split_liq) / 100) * amount,
    precision
  )}`;

  return {
    currency,
    disp_amount,
    disp_split: isLocked ? split_locked : split_liq,
  };
}
