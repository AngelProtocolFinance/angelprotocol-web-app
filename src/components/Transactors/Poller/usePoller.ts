import { useCallback } from "react";
import { useModalContext } from "contexts/ModalContext";
import Transactor from "components/Transactor";
import Poller from ".";
import PollerForm from "./Form";

export default function usePoller() {
  const { showModal } = useModalContext();
  const showPoller = useCallback(() => {
    showModal(Transactor, {
      Content: Poller,
      contentProps: { Form: PollerForm },
    });
    //eslint-disable-next-line
  }, []);

  return showPoller;
}
