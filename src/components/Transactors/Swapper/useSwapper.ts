import { useCallback } from "react";
import { useModalContext } from "contexts/ModalContext";
import Transactor, { TxProps } from "components/Transactor";
import Swapper from "./Swapper";

export default function useSwapper() {
  const { showModal } = useModalContext();
  const showSwapper = useCallback(() => {
    showModal<TxProps<{}>>(Transactor, {
      Content: Swapper,
      contentProps: {},
    });
    //eslint-disable-next-line
  }, []);

  return showSwapper;
}
