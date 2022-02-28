import { useCallback } from "react";
import { useSetModal } from "components/Modal/Modal";
import EnderForm, { Props } from "./ExecuteForm";
import Transactor, { TxProps } from "../Transactor";

export default function useProposalExecutor(proposal_id: number) {
  const { showModal } = useSetModal();
  const showPollEnder = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, {
      inModal: true,
      Content: EnderForm,
      contentProps: { proposal_id },
    });
    //eslint-disable-next-line
  }, [proposal_id]);

  return showPollEnder;
}
