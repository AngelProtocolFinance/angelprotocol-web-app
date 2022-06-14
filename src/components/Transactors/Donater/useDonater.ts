import { useCallback } from "react";
import { DonaterProps } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Transactor, { TxProps } from "components/Transactor";
import Donater from "./Donater";

export default function useDonater(args: DonaterProps) {
  const { showModal } = useModalContext();
  const showDonater = useCallback(() => {
    showModal<TxProps<DonaterProps>>(Transactor, {
      Content: Donater,
      contentProps: args,
    });
    //eslint-disable-next-line
  }, [args]);
  return showDonater;
}
