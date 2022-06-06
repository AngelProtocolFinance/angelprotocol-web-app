import { CURRENCIES } from "constants/currency";
import toCurrency from "helpers/toCurrency";
import { Coin } from "services/wallet/types";

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
              src={CURRENCIES[denom].icon}
              className="w-7 h-7 object-contain mr-2"
              alt=""
            />
            <span className="uppercase text-sm font-bold mr-2 text-angel-grey">
              {CURRENCIES[denom].ticker}
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
