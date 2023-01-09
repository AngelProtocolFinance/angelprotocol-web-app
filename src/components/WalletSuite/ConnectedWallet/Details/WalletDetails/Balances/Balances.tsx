import { Switch } from "@headlessui/react";
import { useState } from "react";
import { WalletState } from "contexts/WalletContext";
import CoinBalances from "./CoinBalances";

export default function Balances(props: WalletState) {
  const [smallAmountsHidden, setIsSmallAmountsHidden] = useState(true);
  return (
    <>
      <CoinBalances
        tokens={props.coins}
        smallAmountsHidden={smallAmountsHidden}
      />
      <div className="flex justify-between items-center font-heading font-semibold text-sm text-gray-d1 dark:text-gray">
        Hide small amounts:
        <Switch
          checked={smallAmountsHidden}
          onChange={(val: boolean) => setIsSmallAmountsHidden(val)}
          className={`${
            smallAmountsHidden ? "bg-orange" : "bg-gray-l1"
          } relative flex h-4 w-8 items-center rounded-full cursor-pointer transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-l2`}
        >
          <span className="sr-only">Hide small amounts</span>
          <span
            className={`${
              smallAmountsHidden ? "translate-x-[1.125rem]" : "translate-x-0.5"
            } pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>
    </>
  );
}
