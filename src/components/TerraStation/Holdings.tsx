import { Coin } from "@terra-money/terra.js";
import { currency_text, currency_icons, denoms } from "constants/curriencies";
import toCurrency from "helpers/toCurrency";

type Props = {
  coinData: Coin.Data[];
};

export default function Holdings(props: Props) {
  return (
    <ul className="p-4">
      {props.coinData.map(({ denom, amount }) => {
        const _denom = denom as denoms;
        return (
          <li
            key={denom}
            className="p-3 grid grid-cols-aa1 border-b border-angel-grey border-opacity-10 items-center"
          >
            <img
              src={currency_icons[_denom] || currency_icons.coin}
              className="w-7 h-7 mr-2"
            />
            <span className="uppercase text-sm font-bold mr-2 text-angel-grey">
              {currency_text[_denom] || currency_text.coin}
            </span>
            <span className="ml-auto text-angel-grey">
              {toCurrency(Number(amount))}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
