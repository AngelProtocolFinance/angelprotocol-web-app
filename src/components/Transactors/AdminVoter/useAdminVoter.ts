import { useCallback } from "react";
import { useModalContext } from "components/ModalContext/ModalContext";
import Transactor, { TxProps } from "../Transactor";
import AdminVoter from "./AdminVoter";
import VoteForm from "./VoteForm";
import { Props } from "./types";

export default function useAdminVoter(proposal_id: number) {
  const { showModal } = useModalContext();
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
