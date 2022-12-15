import { Switch } from "@headlessui/react";
import { useCallback, useMemo, useState } from "react";
import { Token } from "types/aws";
import { useModalContext } from "contexts/ModalContext";
import KadoModal from "components/KadoModal";
import { humanize } from "helpers";

const MIN_AMOUNT = 0.001;

type Props = { coins: Token[]; giftcardCoins: Token[] };

export default function Balances({ coins, giftcardCoins }: Props) {
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

  const filteredGcCoins = useMemo(
    () =>
      giftcardCoins.filter(
        (coin) =>
          //show atleast eth
          (coin.balance > 0 && !hideSmallAmounts) || coin.balance > MIN_AMOUNT
      ),
    [giftcardCoins, hideSmallAmounts]
  );

  const { showModal } = useModalContext();
  const handleOpenKado = useCallback(
    () => showModal(KadoModal, {}),
    [showModal]
  );

  if (!filteredCoins.length && !filteredGcCoins.length) {
    return (
      <span className="text-sm">
        Your wallet is empty.{" "}
        <button
          className="font-bold underline hover:text-orange transition ease-in-out duration-300"
          onClick={handleOpenKado}
        >
          Buy some crypto here
        </button>
      </span>
    );
  }

  return (
    <>
      {!!filteredCoins.length && <CoinBalances coins={filteredCoins} />}

      {!!filteredGcCoins.length && <GiftcardBalances coins={filteredGcCoins} />}

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

function GiftcardBalances({ coins }: { coins: Token[] }) {
  return (
    <>
      <span className="flex items-center font-heading font-semibold text-sm text-gray-d1 dark:text-gray">
        Giftcard balances
      </span>
      <CoinBalances coins={coins} />
    </>
  );
}

function CoinBalances({ coins }: { coins: Token[] }) {
  return (
    <>
      {coins.map((coin) => (
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
    </>
  );
}
