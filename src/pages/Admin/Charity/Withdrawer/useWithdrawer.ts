import { useCallback } from "react";
import { useModalContext } from "contexts/ModalContext";
import Transactor from "components/Transactor";
import Withdrawer from ".";

export default function useWithdrawer(account_addr: string) {
  const { showModal } = useModalContext();
  const showWithdrawer = useCallback(() => {
    showModal(Transactor, {
      Content: Withdrawer,
      contentProps: { account_addr },
    });
    //eslint-disable-next-line
  }, [account_addr]);

  return showWithdrawer;
}
