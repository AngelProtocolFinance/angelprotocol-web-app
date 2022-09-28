import { useCallback } from "react";
import { Props } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Transactor, { TxProps } from "components/Transactor";
import Receipter from "./index";

export default function useReceipter() {
  const { showModal } = useModalContext();

  const showDonor = useCallback((props: Props) => {
    showModal<TxProps<Props>>(Transactor, {
      Content: Receipter,
      contentProps: props,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return showDonor;
}
