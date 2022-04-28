import { useCallback } from "react";
import { TxProps } from "@types-component/transactor";
import { WithdrawerProps } from "@types-component/withdrawer";
import { useSetModal } from "components/Modal/Modal";
import Transactor from "../Transactor";
import Withdrawer from "./Withdrawer";

export default function useWithdrawer(account_addr: string) {
  const { showModal } = useSetModal();
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
