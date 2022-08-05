import { useCallback } from "react";
import { GenericBalance } from "types/server/contracts";
import { useModalContext } from "contexts/ModalContext";
import Transactor from "components/Transactor";
import Withdrawer from ".";

export default function useWithdrawer(balance: GenericBalance) {
  const { showModal } = useModalContext();
  const showWithdrawer = useCallback(() => {
    showModal(Transactor, {
      Content: Withdrawer,
      contentProps: { balance },
    });
    //eslint-disable-next-line
  }, [balance]);

  return showWithdrawer;
}
