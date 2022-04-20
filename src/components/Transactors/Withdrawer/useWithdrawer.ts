import { useCallback } from "react";
import { useModalContext } from "components/ModalContext/ModalContext";
import Withdrawer from "./Withdrawer";
import WithdrawForm from "./WithdrawForm";
import { Props } from "./types";
import Transactor, { TxProps } from "../Transactor";

export default function useWithdrawer(account_addr: string) {
  const { showModal } = useModalContext();
  const showWithdrawer = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, {
      inModal: true,
      Content: Withdrawer,
      contentProps: { Form: WithdrawForm, account_addr },
    });
    //eslint-disable-next-line
  }, [account_addr]);

  return showWithdrawer;
}
