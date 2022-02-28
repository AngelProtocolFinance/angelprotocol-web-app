import { useCallback } from "react";
import { useSetModal } from "components/Modal/Modal";
import Swapper from "./Swapper";
import SwapForm from "./SwapForm";
import { Props } from "./types";
import Transactor, { TxProps } from "../Transactor";

export default function useSwapper() {
  const { showModal } = useSetModal();
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
