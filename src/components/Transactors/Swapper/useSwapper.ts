import { useCallback } from "react";
import { useModalContext } from "components/ModalContext/ModalContext";
import Transactor, { TxProps } from "../Transactor";
import SwapForm from "./SwapForm";
import Swapper from "./Swapper";
import { Props } from "./types";

export default function useSwapper() {
  const { showModal } = useModalContext();
  const showSwapper = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, {
      inModal: true,
      Content: Swapper,
      contentProps: { Form: SwapForm },
    });
    //eslint-disable-next-line
  }, []);

  return showSwapper;
}
