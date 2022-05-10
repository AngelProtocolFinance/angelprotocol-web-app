import { useCallback } from "react";
import { TxProps } from "@types-component/transactor";
import { useModalContext } from "contexts/ModalContext/ModalContext";
import Transactor from "../Transactor";
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
