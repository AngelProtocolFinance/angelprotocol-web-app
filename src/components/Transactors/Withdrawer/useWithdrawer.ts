import { useCallback } from "react";
import { WithdrawerProps } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Transactor, { TxProps } from "components/Transactor";
import Withdrawer from "./Withdrawer";

export default function useWithdrawer(account_addr: string) {
  const { showModal } = useModalContext();
  const showWithdrawer = useCallback(() => {
    showModal<TxProps<WithdrawerProps>>(Transactor, {
      Content: Withdrawer,
      contentProps: { account_addr },
    });
    //eslint-disable-next-line
  }, [account_addr]);

  return showWithdrawer;
}
