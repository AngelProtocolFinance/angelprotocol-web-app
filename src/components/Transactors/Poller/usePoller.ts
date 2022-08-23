import { FC, useCallback } from "react";
import { useModalContext } from "contexts/ModalContext";
import Transactor, { TxProps } from "components/Transactor";
import Poller from "./Poller";
import PollerForm from "./PollerForm";

export default function usePoller() {
  const { showModal } = useModalContext();
  const showPoller = useCallback(() => {
    showModal<TxProps<{ Form: FC }>>(Transactor, {
      Content: Poller,
      contentProps: { Form: PollerForm },
    });
    //eslint-disable-next-line
  }, []);

  return showPoller;
}
