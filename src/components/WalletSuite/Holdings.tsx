import { Coin } from "services/wallet/types";
import toCurrency from "helpers/toCurrency";
import { currency_icons, currency_text, denoms } from "constants/currency";

export default function Holdings(props: { coins: Coin[] }) {
  return (
    <ul className="p-4">
      {props.coins.map(({ denom, amount }) => {
        return (
          <li
            key={denom}
            className="p-3 grid grid-cols-aa1 border-b border-angel-grey/10 items-center"
          >
            <img
              src={currency_icons[denom as denoms] || currency_icons.coin}
              className="w-7 h-7 object-contain mr-2"
              alt=""
            />
            <span className="uppercase text-sm font-bold mr-2 text-angel-grey">
              {currency_text[denom as denoms] || currency_text.coin}
            </span>
            <span className="ml-auto text-angel-grey">
              {toCurrency(amount, 3, true)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
