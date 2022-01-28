import { TxProps } from "components/TransactionSuite/types";
import { Props } from "./types";
import { useCallback } from "react";
import TransactionSuite from "components/TransactionSuite/TransactionSuite";
import { useSetModal } from "components/Nodal/Nodal";
import Swapper from "./Swapper";
import SwapForm from "./SwapForm";

export default function useSwapper() {
  const { showModal } = useSetModal();
  const showSwapper = useCallback(() => {
    showModal<TxProps<Props>>(TransactionSuite, {
      inModal: true,
      Context: Swapper,
      contextProps: { Form: SwapForm },
    });
  }, []);

  return showSwapper;
}
