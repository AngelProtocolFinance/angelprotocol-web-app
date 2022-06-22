import { useCallback } from "react";
import { useModalContext } from "contexts/ModalContext";
import Transactor from "components/Transactor";
import Voter from "./Voter";

export default function useVoter(poll_id: number) {
  const { showModal } = useModalContext();
  const showVoter = useCallback(() => {
    showModal(Transactor, {
      Content: Voter,
      contentProps: { poll_id },
    });
    //eslint-disable-next-line
  }, [poll_id]);

  return showVoter;
}
