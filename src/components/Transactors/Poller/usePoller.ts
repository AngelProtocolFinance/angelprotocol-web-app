import { useCallback } from "react";
import { useSetModal } from "components/Modal/Modal";
import Poller from "./Poller";
import PollerForm from "./PollerForm";
import { Props } from "./types";
import Transactor, { TxProps } from "../Transactor";

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
