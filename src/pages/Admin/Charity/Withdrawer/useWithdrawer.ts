import { useCallback } from "react";
import { GenericBalance } from "types/contracts";
import { useModalContext } from "contexts/ModalContext";
import Transactor, { TxProps } from "components/Transactor";
import Withdrawer from ".";

export default function useWithdrawer(balance: GenericBalance) {
  const { showModal } = useModalContext();
  const showWithdrawer = useCallback(() => {
    showModal<TxProps<{ balance: GenericBalance }>>(Transactor, {
      Content: Withdrawer,
      contentProps: { balance },
    });
    //eslint-disable-next-line
  }, [balance]);

  return showWithdrawer;
}
