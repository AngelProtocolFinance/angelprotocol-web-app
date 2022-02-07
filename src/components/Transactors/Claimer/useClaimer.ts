import { useCallback } from "react";
import { TxProps } from "components/TransactionSuite/types";
import TransactionSuite from "components/TransactionSuite/TransactionSuite";
import { useSetModal } from "components/Nodal/Nodal";
import { Props } from "./types";
import Claimer from "./Claimer";
import ClaimForm from "./ClaimForm";

export default function useClaimer() {
  const { showModal } = useSetModal();
  const showClaimer = useCallback(() => {
    showModal<TxProps<Props>>(TransactionSuite, {
      inModal: true,
      Context: Claimer,
      contextProps: { Form: ClaimForm },
    });
    //eslint-disable-next-line
  }, []);
  return showClaimer;
}
