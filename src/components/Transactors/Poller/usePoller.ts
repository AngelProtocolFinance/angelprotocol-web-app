import { useCallback } from "react";
import { Props } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Transactor, { TxProps } from "components/Transactor";
import Poller from ".";
import PollerForm from "./Form";

export default function usePoller() {
  const { showModal } = useModalContext();
  const showPoller = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, {
      Content: Poller,
      contentProps: { Form: PollerForm },
    });
    //eslint-disable-next-line
  }, []);

  return showPoller;
}
