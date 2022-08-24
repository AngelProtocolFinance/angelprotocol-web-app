import { useCallback } from "react";
import { useModalContext } from "contexts/ModalContext";
import Transactor from "components/Transactor";
import ClaimForm from ".";

export default function useClaimer() {
  const { showModal } = useModalContext();
  const showClaimer = useCallback(() => {
    showModal(Transactor, {
      Content: ClaimForm,
      contentProps: {},
    });
    //eslint-disable-next-line
  }, []);
  return showClaimer;
}
