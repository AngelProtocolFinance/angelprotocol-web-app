import { useCallback } from "react";
import { TxProps } from "components/TransactionSuite/types";
import TransactionSuite from "components/TransactionSuite/TransactionSuite";
import { useSetModal } from "components/Modal/Modal";
import EnderForm, { Props } from "./ExecuteForm";

export default function useProposalExecutor(proposal_id: number) {
  const { showModal } = useSetModal();
  const showPollEnder = useCallback(() => {
    showModal<TxProps<Props>>(TransactionSuite, {
      inModal: true,
      Context: EnderForm,
      contextProps: { proposal_id },
    });
    //eslint-disable-next-line
  }, [proposal_id]);

  return showPollEnder;
}
