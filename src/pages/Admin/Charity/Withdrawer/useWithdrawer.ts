import { useCallback } from "react";
import { GenericBalance } from "types/contracts";
import { useModalContext } from "contexts/ModalContext";
import Transactor, { TxProps } from "components/Transactor";
import Withdrawer from ".";

export default function useWithdrawer() {
  const { showModal } = useModalContext();
  const showWithdrawer = useCallback((balance: GenericBalance) => {
    showModal<TxProps<{ balance: GenericBalance }>>(Transactor, {
      Content: Withdrawer,
      contentProps: { balance },
    });
    //eslint-disable-next-line
  }, []);

  return showWithdrawer;
}
