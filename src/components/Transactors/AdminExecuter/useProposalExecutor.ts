import { useCallback } from "react";
import { TxProps } from "@types-component/transactor";
import { useSetModal } from "components/Modal/Modal";
import Transactor from "../Transactor";
import ExecuteForm from "./ExecuteForm";

export default function useProposalExecutor(proposal_id: number) {
  const { showModal } = useSetModal();
  const showPollEnder = useCallback(() => {
    showModal<TxProps<{ proposal_id: number }>>(Transactor, {
      inModal: true,
      Content: ExecuteForm,
      contentProps: { proposal_id },
    });
    //eslint-disable-next-line
  }, [proposal_id]);

  return showPollEnder;
}
