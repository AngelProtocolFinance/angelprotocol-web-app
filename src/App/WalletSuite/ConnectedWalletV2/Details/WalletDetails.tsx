import { useMemo, useState } from "react";
import { WalletState } from "contexts/WalletContext";
import { humanize } from "helpers";

const criterionAmount = 0.001;

export default function WalletDetails(props: WalletState) {
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

  if (!filteredCoins.length) {
    return <div>wallet is empty</div>;
  }

  return (
    <div className="grid gap-3 p-4 border-b border-gray-l2">
      {filteredCoins.map((coin) => (
        <div className="flex justify-between items-center gap-2 font-heading font-bold text-sm">
          <span className="flex items-center gap-2">
            <img src={coin.logo} className="w-6 h-6 object-contain" />
            {coin.symbol}
          </span>
          {humanize(coin.balance, 3, true)}
        </div>
      ))}
    </div>
  );
}
