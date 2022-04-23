import { useCallback } from "react";
import { useModalContext } from "components/ModalContext/ModalContext";
import Transactor, { TxProps } from "../Transactor";
import EnderForm, { Props } from "./EnderForm";

export default function usePollEnder(poll_id: number) {
  const { showModal } = useModalContext();
  const showPollEnder = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, {
      inModal: true,
      Content: EnderForm,
      contentProps: { poll_id },
    });
    //eslint-disable-next-line
  }, [poll_id]);

  return showPollEnder;
}
