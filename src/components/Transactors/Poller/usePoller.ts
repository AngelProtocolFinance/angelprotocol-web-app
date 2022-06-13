import { useCallback } from "react";
import { Props } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Transactor, { TxProps } from "components/Transactor";
import Poller from "./Poller";
import PollerForm from "./PollerForm";

export default function usePoller() {
  const { showModal } = useModalContext();
  const showPoller = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, {
      inModal: true,
      Content: Poller,
      contentProps: { Form: PollerForm },
    });
    //eslint-disable-next-line
  }, []);

  return showPoller;
}
