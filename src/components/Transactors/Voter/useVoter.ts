import { useCallback } from "react";
import { useModalContext } from "contexts/ModalContext";
import Transactor, { TxProps } from "components/Transactor";
import Voter from ".";

export default function useVoter(poll_id: number) {
  const { showModal } = useModalContext();
  const showVoter = useCallback(() => {
    showModal<TxProps<{ poll_id: number }>>(Transactor, {
      Content: Voter,
      contentProps: { poll_id },
    });
    //eslint-disable-next-line
  }, [poll_id]);

  return showVoter;
}
