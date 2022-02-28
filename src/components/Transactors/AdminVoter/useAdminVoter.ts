import { useCallback } from "react";
import { useSetModal } from "components/Modal/Modal";
import AdminVoter from "./AdminVoter";
import VoteForm from "./VoteForm";
import { Props } from "./types";
import Transactor, { TxProps } from "../Transactor";

export default function useAdminVoter(proposal_id: number) {
  const { showModal } = useSetModal();
  const showVoter = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, {
      inModal: true,
      Content: AdminVoter,
      contentProps: { Form: VoteForm, proposal_id },
    });
    //eslint-disable-next-line
  }, [proposal_id]);

  return showVoter;
}
