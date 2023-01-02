import { Switch } from "@headlessui/react";
import { useState } from "react";
import { Token } from "types/aws";
import { useBalancesQuery } from "services/apes";
import { ConnectedWallet } from "contexts/Wallet";
import Icon from "components/Icon";
import CoinBalances from "./CoinBalances";
import KadoOpener from "./KadoOpener";

const MIN_AMOUNT = 0.001;
export default function Balances(props: ConnectedWallet) {
  const [isSmallAmountsShown, setIsSmallAmountsShown] = useState(false);

  const { data: tokens } = useBalancesQuery(
    {
      address: props.address,
      chainId: props.chainId,
    },
    {
      selectFromResult({ data = [], error }) {
        return {
          error,
          data: data.filter(
            (token) =>
              //show atleast native
              (token.balance > 0 && !isSmallAmountsShown) ||
              token.balance > MIN_AMOUNT ||
              (token.gift || 0) > 0
          ),
        };
      },
    }
  );

  const isEmpty = tokens.length <= 0;

  if (isEmpty) {
    return (
      <span className="text-sm">
        Your wallet is empty. <KadoOpener />
      </span>
    );
  }

  return (
    <>
      {!isEmpty && <CoinBalances coins={tokens} />}

      {!isEmpty && (
        <div className="border-t border-gray-l2 dark:border-bluegray" />
      )}

      <div className="flex justify-between items-center font-heading font-semibold text-sm text-gray-d1 dark:text-gray">
        Hide small amounts:
        <Switch
          checked={isSmallAmountsShown}
          onChange={(val) => setIsSmallAmountsShown(val)}
          className={`${
            isSmallAmountsShown ? "bg-orange" : "bg-gray-l1"
          } relative flex h-4 w-8 items-center rounded-full cursor-pointer transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-l2`}
        >
          <span className="sr-only">Hide small amounts</span>
          <span
            className={`${
              isSmallAmountsShown ? "translate-x-[1.125rem]" : "translate-x-0.5"
            } pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>
    </>
  );
}

function GiftcardBalances({ coins }: { coins: Token[] }) {
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
