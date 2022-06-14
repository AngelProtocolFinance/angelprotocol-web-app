import { useCallback } from "react";
import { PrevTxDetails } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Receipter from "components/Receipter/Receipter";
import Transactor from "components/Transactor";

export default function useReceipter() {
  const { showModal } = useModalContext();

  const showDonor = useCallback((prevTx?: PrevTxDetails) => {
    showModal(Transactor, {
      Content: Receipter,
      contentProps: { prevTx },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return showDonor;
}
