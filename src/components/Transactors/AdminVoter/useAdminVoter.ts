import { useCallback } from "react";
import { TxProps } from "components/TransactionSuite/types";
import TransactionSuite from "components/TransactionSuite/TransactionSuite";
import { useSetModal } from "components/Modal/Modal";
import AdminVoter from "./AdminVoter";
import VoteForm from "./VoteForm";
import { Props } from "./types";

export default function useAdminVoter(proposal_id: number) {
  const { showModal } = useSetModal();
  const showVoter = useCallback(() => {
    showModal<TxProps<Props>>(TransactionSuite, {
      inModal: true,
      Context: AdminVoter,
      contextProps: { Form: VoteForm, proposal_id },
    });
    //eslint-disable-next-line
  }, [proposal_id]);

  return showVoter;
}
