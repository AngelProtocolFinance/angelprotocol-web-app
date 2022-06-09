import { DonateValues } from "components/Transactors/Donater/types";
import { CURRENCIES, denoms } from "constants/currency";
import toCurrency from "helpers/toCurrency";
import { useFormContext } from "react-hook-form";

export default function usePortion(type: string) {
  const isLocked = type === "locked";
  const { watch } = useFormContext<DonateValues>();
  const split_liq = Number(watch("split_liq"));
  const split_locked: number = 100 - split_liq;
  const amount = Number(watch("amount")) || 0;
  const currency = watch("currency");

  //values
  const precision = decimals[currency];
  const disp_amount = `${CURRENCIES[currency].ticker} ${toCurrency(
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
  [denoms.uluna]: 6,
  [denoms.ether]: 6,
};
