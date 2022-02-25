import { useCallback } from "react";
import { useSetModal } from "components/Modal/Modal";
import Transactor, { TxProps } from "../Transactor";
import ClaimForm from "./ClaimForm";

export default function useClaimer() {
  const { showModal } = useSetModal();
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
