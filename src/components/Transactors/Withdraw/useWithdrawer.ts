import { useCallback } from "react";
import { TxProps } from "components/TransactionSuite/types";
import TransactionSuite from "components/TransactionSuite/TransactionSuite";
import { useSetModal } from "components/Modal/Modal";
import Withdrawer from "./Withdraw";
import WithdrawForm from "./WithdrawForm";
import { Props } from "./types";

export default function useWithdrawer(account_addr: string) {
  const { showModal } = useSetModal();
  const showWithdrawer = useCallback(() => {
    showModal<TxProps<Props>>(TransactionSuite, {
      inModal: true,
      Context: Withdrawer,
      contextProps: { Form: WithdrawForm, account_addr },
    });
    //eslint-disable-next-line
  }, [account_addr]);

  return showWithdrawer;
}
