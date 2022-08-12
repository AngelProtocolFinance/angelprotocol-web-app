import { useCallback } from "react";
import { useModalContext } from "contexts/ModalContext";
import Transactor from "components/Transactor";
import Voter from ".";

export default function useAdminVoter(proposalId: number) {
  const { showModal } = useModalContext();
  const showVoter = useCallback(() => {
    showModal(Transactor, {
      Content: Voter,
      contentProps: { proposalId },
    });
    //eslint-disable-next-line
  }, [proposalId]);

  return showVoter;
}
