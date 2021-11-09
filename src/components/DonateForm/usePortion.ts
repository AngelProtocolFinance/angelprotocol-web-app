import { Values } from "components/Donater/types";
import { currency_text, denoms } from "constants/currency";
import toCurrency from "helpers/toCurrency";
import { useFormContext } from "react-hook-form";

export default function usePortion(type: string) {
  const isLocked = type === "locked";
  const { watch } = useFormContext<Values>();
  const split_locked = Number(watch("split"));
  const split_liq = 100 - split_locked;
  const amount = watch("amount");
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

const decimals: { [index: string]: number } = {
  [denoms.uusd]: 2,
  [denoms.btc]: 6,
  [denoms.ether]: 6,
};
