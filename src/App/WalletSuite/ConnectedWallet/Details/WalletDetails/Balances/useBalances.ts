import { useCallback, useMemo, useState } from "react";
import { Token } from "types/aws";
import { useModalContext } from "contexts/ModalContext";
import KadoModal from "components/KadoModal";

const MIN_AMOUNT = 0.001;

export default function useBalances(coins: Token[], giftcardCoins: Token[]) {
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
