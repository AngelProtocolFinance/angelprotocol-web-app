import { useCallback } from "react";
import { useSetModal } from "components/Modal/Modal";
import Transactor, { TxProps } from "../Transactor";
import Swapper from "./Swapper";

export default function useSwapper() {
  const { showModal } = useSetModal();
  const showSwapper = useCallback(() => {
    showModal<TxProps<{}>>(Transactor, {
      inModal: true,
      Content: Swapper,
      contentProps: {},
    });
    //eslint-disable-next-line
  }, []);

  return showSwapper;
}
