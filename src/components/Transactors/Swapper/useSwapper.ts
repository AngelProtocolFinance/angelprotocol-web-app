import { useCallback } from "react";
import { TxProps } from "components/TransactionSuite/types";
import TransactionSuite from "components/TransactionSuite/TransactionSuite";
import { useSetModal } from "components/Modal/Modal";
import Swapper from "./Swapper";
import SwapForm from "./SwapForm";
import { Props } from "./types";

export default function useSwapper() {
  const { showModal } = useSetModal();
  const showSwapper = useCallback(() => {
    showModal<TxProps<Props>>(TransactionSuite, {
      inModal: true,
      Context: Swapper,
      contextProps: { Form: SwapForm },
    });
    //eslint-disable-next-line
  }, []);

  return showSwapper;
}
