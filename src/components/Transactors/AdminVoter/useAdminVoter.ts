import { useCallback } from "react";
import { Props } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Transactor, { TxProps } from "components/Transactors";
import AdminVoter from "./AdminVoter";

export default function useAdminVoter(proposal_id: number) {
  const { showModal } = useModalContext();
  const showVoter = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, {
      inModal: true,
      Content: AdminVoter,
      contentProps: { proposal_id },
    });
    //eslint-disable-next-line
  }, [proposal_id]);

  return showVoter;
}
