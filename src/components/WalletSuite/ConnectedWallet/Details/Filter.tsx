import { Switch } from "@headlessui/react";
import { ReactElement, useMemo, useState } from "react";
import { WithBalance } from "services/types";

const criterionAmount = 0.001;

export default function Filter(props: {
  coins: WithBalance[];
  children(filtered: WithBalance[]): ReactElement;
}) {
  const [isSmallAmountsShown, setIsSmallAmountShown] = useState(false);
  const filteredCoins = useMemo(
    () =>
      props.coins.filter((coin) =>
        //show atleast eth
        coin.balance > 0 && isSmallAmountsShown
          ? true
          : +coin.balance > criterionAmount
      ),
    [props.coins, isSmallAmountsShown]
  );

  if (props.coins.length <= 0) {
    return <div>wallet is empty</div>;
  }

  return (
    <div>
      <Switch
        checked={isSmallAmountsShown}
        onChange={setIsSmallAmountShown}
        className={`${
          isSmallAmountsShown ? "bg-blue-600" : "bg-gray-200"
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${
            isSmallAmountsShown ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white`}
        />
      </Switch>
      {props.children(filteredCoins)}
    </div>
  );
}
