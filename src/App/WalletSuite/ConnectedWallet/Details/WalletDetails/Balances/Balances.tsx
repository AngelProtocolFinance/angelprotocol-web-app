import { Switch } from "@headlessui/react";
import { TokenWithBalance } from "types/aws";
import { WalletState } from "contexts/WalletContext";
import Icon from "components/Icon";
import CoinBalances from "./CoinBalances";
import useBalances from "./useBalances";

export default function Balances(props: WalletState) {
  const {
    hideSmallAmounts,
    filteredCoins,
    setHideSmallAmounts,
    handleBuyCrypto,
  } = useBalances(props.coins);

  if (!filteredCoins.length) {
    return (
      <span className="text-sm">
        Your wallet is empty.{" "}
        <button
          className="font-bold underline hover:text-orange transition ease-in-out duration-300"
          onClick={handleBuyCrypto}
        >
          Buy some crypto here
        </button>
      </span>
    );
  }

  return (
    <>
      {!!filteredCoins.length && <CoinBalances coins={filteredCoins} />}

      {!!filteredCoins.length && (
        <div className="border-t border-gray-l2 dark:border-bluegray" />
      )}

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

function GiftcardBalances({ coins }: { coins: TokenWithBalance[] }) {
  return (
    <>
      <span className="flex items-center gap-2 font-heading font-semibold text-sm text-gray-d1 dark:text-gray">
        <Icon
          type="Giftcard"
          className="bg-green text-white rounded-full p-1 w-6 h-6"
        />
        Giftcard balances
      </span>
      <CoinBalances coins={coins} />
    </>
  );
}
