import { useCallback } from "react";
import { useModalContext } from "components/ModalContext/ModalContext";
import Transactor, { TxProps } from "../Transactor";
import Withdrawer from "./Withdrawer";
import { WithdrawerProps } from "./types";

export default function useWithdrawer(account_addr: string) {
  const { showModal } = useModalContext();
  const showWithdrawer = useCallback(() => {
    showModal<TxProps<WithdrawerProps>>(Transactor, {
      inModal: true,
      Content: Withdrawer,
      contentProps: { account_addr },
    });
    //eslint-disable-next-line
  }, [account_addr]);

  return showWithdrawer;
}
