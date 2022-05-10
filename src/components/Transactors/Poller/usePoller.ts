import { useCallback } from "react";
import { Props } from "@types-component/poller";
import { TxProps } from "@types-component/transactor";
import { useModalContext } from "contexts/ModalContext/ModalContext";
import Transactor from "../Transactor";
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
