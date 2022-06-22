import { useCallback } from "react";
import { useModalContext } from "contexts/ModalContext";
import Transactor from "components/Transactor";
import EnderForm from "./EnderForm";

export default function usePollEnder(poll_id: number) {
  const { showModal } = useModalContext();
  const showPollEnder = useCallback(() => {
    showModal(Transactor, {
      Content: EnderForm,
      contentProps: { poll_id },
    });
    //eslint-disable-next-line
  }, [poll_id]);

  return showPollEnder;
}
