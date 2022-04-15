import { useCallback } from "react";
import { useSetModal } from "components/Modal/Modal";
import Transactor, { TxProps } from "../Transactor";
import SwapForm from "./SwapForm";
import Swapper from "./Swapper";
import { Props } from "./types";

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
