import { useCallback } from "react";
import { useModalContext } from "contexts/ModalContext";
import Transactor, { TxProps } from "components/Transactors";
import ExecuteForm from "./ExecuteForm";
import { AdmiExecuterProps } from "./types";

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
