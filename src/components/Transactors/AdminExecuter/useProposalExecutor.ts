import { useCallback } from "react";
import { AdmiExecuterProps } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Transactor from "components/Transactor";
import ExecuteForm from "./ExecuteForm";

export default function useProposalExecutor(args: AdmiExecuterProps) {
  const { showModal } = useModalContext();
  const showPollEnder = useCallback(() => {
    showModal(Transactor, {
      Content: ExecuteForm,
      contentProps: args,
    });
    //eslint-disable-next-line
  }, [args]);

  return showPollEnder;
}
