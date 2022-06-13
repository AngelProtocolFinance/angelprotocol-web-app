import { useFormContext } from "react-hook-form";
import { DonateValues } from "components/Transactors/Donater/types";
<<<<<<< HEAD
=======
import { CURRENCIES, denoms } from "constants/currency";
>>>>>>> master
import toCurrency from "helpers/toCurrency";

export default function usePortion(type: string) {
  const isLocked = type === "locked";
  const { watch } = useFormContext<DonateValues>();
  const split_liq = Number(watch("split_liq"));
  const split_locked: number = 100 - split_liq;
  const amount = Number(watch("amount")) || 0;
  const token = watch("token");

  //values
<<<<<<< HEAD
  const disp_amount = `${token.symbol} ${toCurrency(
=======
  const precision = decimals[currency];
  const disp_amount = `${CURRENCIES[currency].ticker} ${toCurrency(
>>>>>>> master
    ((isLocked ? split_locked : split_liq) / 100) * amount,
    6
  )}`;

  return {
    disp_amount,
    disp_split: isLocked ? split_locked : split_liq,
  };
}
<<<<<<< HEAD
=======

const decimals: { [index: string]: number } = {
  [denoms.uluna]: 6,
  [denoms.ether]: 6,
};
>>>>>>> master
