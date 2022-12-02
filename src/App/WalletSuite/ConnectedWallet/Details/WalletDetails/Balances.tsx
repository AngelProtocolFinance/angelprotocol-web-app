import { Switch } from "@headlessui/react";
import { useMemo, useState } from "react";
import { Token } from "types/aws";
import { humanize } from "helpers";

const MIN_AMOUNT = 0.001;

export default function Balances({ coins }: { coins: Token[] }) {
  const [hideSmallAmounts, setHideSmallAmounts] = useState(true);

  const filteredCoins = useMemo(
    () =>
      coins.filter(
        (coin) =>
          //show atleast eth
          (coin.balance > 0 && !hideSmallAmounts) || coin.balance > MIN_AMOUNT
      ),
    [coins, hideSmallAmounts]
  );

  if (!filteredCoins.length) {
    return <span className="flex justify-center">wallet is empty</span>;
  }

  return (
    <>
      {filteredCoins.map((coin) => (
        <div
          key={coin.token_id}
          className="flex justify-between items-center gap-2 font-heading font-bold text-sm"
        >
          <span className="flex items-center gap-2">
            <img src={coin.logo} className="w-6 h-6 object-contain" alt="" />
            {coin.symbol}
          </span>
          {humanize(coin.balance, 3, true)}
        </div>
      ))}
      <div className="flex justify-between items-center font-heading font-semibold text-sm text-gray-d1 dark:text-gray">
        Hide small amounts:
        <Switch
          checked={hideSmallAmounts}
          onChange={setHideSmallAmounts}
          className={`${
            hideSmallAmounts ? "bg-orange" : "bg-gray-l1"
          } relative flex h-4 w-8 items-center rounded-full cursor-pointer transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-l2`}
        >
          <span className="sr-only">Hide small amounts</span>
          <span
            className={`${
              hideSmallAmounts ? "translate-x-[1.125rem]" : "translate-x-0.5"
            } pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>
    </>
  );
}
