import { useCallback } from "react";
import { DonaterProps } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Transactor from "components/Transactor";
import Donater from "./Donater";

export default function useDonater(args: DonaterProps) {
  const { showModal } = useModalContext();

  const showDonater = useCallback(() => {
    showModal(Transactor, {
      Content: Donater,
      contentProps: args,
    });
  }, [args, showModal]);

  return showDonater;
}
