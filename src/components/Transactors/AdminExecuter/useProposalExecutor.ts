import { useCallback } from "react";
import { AdmiExecuterProps } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Transactor, { TxProps } from "components/Transactor";
import ExecuteForm from "./ExecuteForm";

export default function useProposalExecutor(args: AdmiExecuterProps) {
  const { showModal } = useModalContext();
  const showPollEnder = useCallback(() => {
    showModal<TxProps<AdmiExecuterProps>>(Transactor, {
      Content: ExecuteForm,
      contentProps: args,
    });
    //eslint-disable-next-line
  }, [args]);

  return showPollEnder;
}
