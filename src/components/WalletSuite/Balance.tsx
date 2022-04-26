import { Denoms } from "@types-lists";
import toCurrency from "helpers/toCurrency";
import { currency_icons, currency_text } from "constants/currency";

export default function Balance(props: {
  denom: Denoms;
  amount: number;
  precision: number;
}) {
  return (
    <li className="p-3 grid grid-cols-aa1 border-b border-angel-grey/10 items-center">
      <img
        src={currency_icons[props.denom] || currency_icons.coin}
        className="w-7 h-7 mr-2 object-contain"
        alt=""
      />
      <span className="uppercase text-sm font-bold mr-2 text-angel-grey">
        {currency_text[props.denom] || currency_text.coin}
      </span>
      <span className="ml-auto text-angel-grey">
        {toCurrency(props.amount, props.precision)}
      </span>
    </li>
  );
}
