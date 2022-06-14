import { useCallback } from "react";
import { useModalContext } from "contexts/ModalContext";
import Transactor, { TxProps } from "components/Transactor";
import EnderForm from "./EnderForm";

export default function usePollEnder(poll_id: number) {
  const { showModal } = useModalContext();
  const showPollEnder = useCallback(() => {
    showModal<TxProps<{ poll_id: number }>>(Transactor, {
      Content: EnderForm,
      contentProps: { poll_id },
    });
    //eslint-disable-next-line
  }, [poll_id]);

  return showPollEnder;
}
