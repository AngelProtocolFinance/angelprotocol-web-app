import { useCallback, useMemo, useState } from "react";
import { Token, TokenWithBalance } from "types/aws";
import { useModalContext } from "contexts/ModalContext";
import KadoModal from "components/KadoModal";

const MIN_AMOUNT = 0.001;

export default function useBalances(coins: TokenWithBalance[]) {
  const [hideSmallAmounts, setHideSmallAmounts] = useState(true);
  const { showModal } = useModalContext();

  const filteredCoins = useMemo(
    () => getFiltered(coins, hideSmallAmounts),
    [coins, hideSmallAmounts]
  );

  const handleBuyCrypto = useCallback(
    () => showModal(KadoModal, {}),
    [showModal]
  );

  return {
    hideSmallAmounts,
    filteredCoins,
    setHideSmallAmounts,
    handleBuyCrypto,
  };
}

const getFiltered = (coins: TokenWithBalance[], shouldFilter: boolean) =>
  coins.filter(
    (coin) =>
      //show atleast eth
      (coin.balance > 0 && !shouldFilter) || coin.balance > MIN_AMOUNT
  );
