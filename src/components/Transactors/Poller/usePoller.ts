import { useCallback } from "react";
import { TxProps } from "components/TransactionSuite/types";
import TransactionSuite from "components/TransactionSuite/TransactionSuite";
import { useSetModal } from "components/Nodal/Nodal";
import Poller from "./Poller";
import PollerForm from "./PollerForm";
import { Props } from "./types";

export default function usePoller() {
  const { showModal } = useSetModal();
  const showPoller = useCallback(() => {
    showModal<TxProps<Props>>(TransactionSuite, {
      inModal: true,
      Context: Poller,
      contextProps: { Form: PollerForm },
    });
    //eslint-disable-next-line
  }, []);

  return showPoller;
}
