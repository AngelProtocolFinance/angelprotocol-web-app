import { useCallback } from "react";
import { useModalContext } from "components/ModalContext/ModalContext";
import Transactor, { TxProps } from "../Transactor";
import ClaimForm from "./ClaimForm";

export default function useClaimer() {
  const { showModal } = useModalContext();
  const showClaimer = useCallback(() => {
    showModal<TxProps<{}>>(Transactor, {
      inModal: true,
      Content: ClaimForm,
      contentProps: {},
    });
    //eslint-disable-next-line
  }, []);

  return showClaimer;
}
