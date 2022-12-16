import { useCallback, useMemo, useState } from "react";
import { Token } from "types/aws";
import { useModalContext } from "contexts/ModalContext";
import KadoModal from "components/KadoModal";

const MIN_AMOUNT = 0.001;

export default function useBalances(coins: Token[], giftcardCoins: Token[]) {
  const [hideSmallAmounts, setHideSmallAmounts] = useState(true);
  const { showModal } = useModalContext();

  const filteredCoins = useMemo(
    () => getFiltered(coins, hideSmallAmounts),
    [coins, hideSmallAmounts]
  );

  const filteredGcCoins = useMemo(
    () => getFiltered(giftcardCoins, hideSmallAmounts),
    [giftcardCoins, hideSmallAmounts]
  );

  const handleBuyCrypto = useCallback(
    () => showModal(KadoModal, {}),
    [showModal]
  );

  return {
    hideSmallAmounts,
    filteredCoins,
    filteredGcCoins,
    setHideSmallAmounts,
    handleBuyCrypto,
  };
}

const getFiltered = (coins: Token[], shouldFilter: boolean) =>
  coins.filter(
    (coin) =>
      //show atleast eth
      (coin.balance > 0 && !shouldFilter) || coin.balance > MIN_AMOUNT
  );
