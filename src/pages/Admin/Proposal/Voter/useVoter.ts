import { useCallback } from "react";
import { useModalContext } from "contexts/ModalContext";
import Transactor from "components/Transactor";
import AdminVoter from ".";

export default function useAdminVoter(proposal_id: number) {
  const { showModal } = useModalContext();
  const showVoter = useCallback(() => {
    showModal(Transactor, {
      Content: AdminVoter,
      contentProps: { proposal_id },
    });
    //eslint-disable-next-line
  }, [proposal_id]);

  return showVoter;
}
