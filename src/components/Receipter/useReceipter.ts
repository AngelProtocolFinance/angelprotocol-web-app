import { useCallback } from "react";
import { PrevTxDetails } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Receipter from "components/Receipter/Receipter";
import Transactor, { TxProps } from "components/Transactor";

export default function useReceipter() {
  const { showModal } = useModalContext();

  const showDonor = useCallback((prevTx?: PrevTxDetails) => {
    showModal<TxProps<{ prevTx?: PrevTxDetails }>>(Transactor, {
      Content: Receipter,
      contentProps: { prevTx },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return showDonor;
}
