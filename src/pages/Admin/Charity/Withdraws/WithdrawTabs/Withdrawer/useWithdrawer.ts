import { useCallback } from "react";
import { WithdrawerProps } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Transactor, { TxProps } from "components/Transactor";
import Withdrawer from ".";

export default function useWithdrawer() {
  const { showModal } = useModalContext();
  const showWithdrawer = useCallback((props: WithdrawerProps) => {
    showModal<TxProps<WithdrawerProps>>(Transactor, {
      Content: Withdrawer,
      contentProps: props,
    });
    //eslint-disable-next-line
  }, []);

  return showWithdrawer;
}
