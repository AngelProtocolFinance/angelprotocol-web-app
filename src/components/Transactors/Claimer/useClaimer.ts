import { useCallback } from "react";
import { TxProps } from "@types-component/transactor";
import { useSetModal } from "components/Modal/Modal";
import Transactor from "../Transactor";
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
