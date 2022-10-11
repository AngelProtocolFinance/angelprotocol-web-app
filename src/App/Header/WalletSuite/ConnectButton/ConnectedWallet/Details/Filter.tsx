import { Switch } from "@headlessui/react";
import { ReactElement, useMemo, useState } from "react";
import { Token } from "types/aws";

const criterionAmount = 0.001;

export default function Filter(props: {
  coins: Token[];
  classes?: string;
  children(filtered: Token[]): ReactElement;
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
    return <div className={props.classes ?? ""}>wallet is empty</div>;
  }

  return (
    <div className={`px-3 ${props.classes ?? ""}`}>
      <div className="flex items-center gap-1">
        <Switch
          checked={isSmallAmountsShown}
          onChange={setIsSmallAmountShown}
          className={`${
            isSmallAmountsShown ? "bg-blue" : "bg-gray-l1"
          } relative flex h-4 w-9 items-center rounded-full`}
        >
          <span
            className={`${
              isSmallAmountsShown ? "translate-x-5" : "translate-x-1"
            } inline-block h-3 w-3 transform rounded-full bg-white`}
          />
        </Switch>
        <span className="font-mono text-sm text-gray-d2">
          {"<" + criterionAmount}
        </span>
      </div>

      {props.children(filteredCoins)}
    </div>
  );
}
