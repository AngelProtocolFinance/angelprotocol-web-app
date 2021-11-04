import { Values } from "components/Donater/types";
import { currency_text, denoms } from "constants/currency";
import toCurrency from "helpers/toCurrency";
import { useFormContext } from "react-hook-form";

export default function usePortion(type: string) {
  const isLocked = type === "locked";
  const { watch } = useFormContext<Values>();
  const split = Number(watch("split"));
  const amount = Number(watch("amount")) || 0;
  const currency = watch("currency");

  //values
  const desc = isLocked ? "Compounded forever" : "Readily available";
  const splitTxt = isLocked ? split : 100 - split;
  const precision = decimals[currency];
  const amountTxt = isLocked
    ? `${currency_text[currency]} ${toCurrency(
        (split / 100) * amount,
        precision
      )}`
    : `${currency_text[currency]} ${toCurrency(
        ((100 - split) / 100) * amount,
        precision
      )}`;

  //styles
  const txtColor = isLocked ? "text-blue-accent" : "text-green-400";
  const borderColor = isLocked ? "border-angel-blue" : "border-green-400";

  return { currency, desc, amountTxt, splitTxt, txtColor, borderColor };
}

const decimals: { [index: string]: number } = {
  [denoms.uusd]: 2,
  [denoms.btc]: 6,
  [denoms.ether]: 6,
};
