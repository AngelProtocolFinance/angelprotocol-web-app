import { NativeTokenWithBalance } from "services/types";
import toCurrency from "helpers/toCurrency";

export default function Holdings(props: { coins: NativeTokenWithBalance[] }) {
  return (
    <ul className="p-4">
      {props.coins.map((coin) => {
        return (
          <li
            key={coin.symbol}
            className="pt-3 pb-1 grid grid-cols-aa1 items-center border-b border-angel-grey/10"
          >
            <img
              src={coin.logo}
              className="w-7 h-7 object-contain mr-2"
              alt=""
            />
            <span className="uppercase text-sm font-bold mr-2 text-angel-grey">
              {coin.symbol}
            </span>
            <span className="ml-auto text-angel-grey">
              {toCurrency(+coin.balance, 3, true)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
