import { useCallback } from "react";
import { AdmiExecuterProps } from "@types-component/admin-executer";
import { TxProps } from "@types-component/transactor";
import { useModalContext } from "contexts/ModalContext/ModalContext";
import Transactor from "../Transactor";
import ExecuteForm from "./ExecuteForm";

export default function useProposalExecutor(args: AdmiExecuterProps) {
  const { showModal } = useModalContext();
  const showPollEnder = useCallback(() => {
    showModal<TxProps<AdmiExecuterProps>>(Transactor, {
      inModal: true,
      Content: ExecuteForm,
      contentProps: args,
    });
    //eslint-disable-next-line
  }, [args]);

  return showPollEnder;
}
