import { useCallback } from "react";
import { useSetModal } from "components/Modal/Modal";
import Transactor, { TxProps } from "../Transactor";
import Poller from "./Poller";
import PollerForm from "./PollerForm";
import { Props } from "./types";

export default function usePoller() {
  const { showModal } = useSetModal();
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
