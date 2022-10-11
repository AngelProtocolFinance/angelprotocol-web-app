import { Token } from "types/aws";
import { humanize } from "helpers";

export default function Holdings(props: { coins: Token[] }) {
  return (
    <ul className="w-full grid gap-y-2 mt-1">
      {props.coins.map((coin) => {
        return (
          <li
            key={coin.symbol}
            className="pb-1 grid grid-cols-[auto_auto_1fr] items-center border-b last:border-none border-gray-d2/10"
          >
            <img
              src={coin.logo}
              className="w-7 h-7 object-contain mr-2"
              alt=""
            />
            <span className="uppercase text-sm font-bold mr-2 text-gray-d2">
              {coin.symbol}
            </span>
            <span className="ml-auto text-gray-d2">
              {humanize(+coin.balance, 3, true)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
