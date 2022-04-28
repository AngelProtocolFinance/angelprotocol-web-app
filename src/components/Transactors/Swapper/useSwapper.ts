import { useCallback } from "react";
import { TxProps } from "@types-component/transactor";
import { useSetModal } from "components/Modal/Modal";
import Transactor from "../Transactor";
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
