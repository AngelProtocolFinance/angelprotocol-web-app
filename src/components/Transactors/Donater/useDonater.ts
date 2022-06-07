import { useCallback } from "react";
import { useModalContext } from "contexts/ModalContext";
import Transactor, { TxProps } from "components/Transactors";
import Donater from "./Donater";
import { FundFlow } from "./types";

export default function useDonater(args: FundFlow) {
  const { showModal } = useModalContext();
  const showDonater = useCallback(() => {
    showModal<TxProps<FundFlow>>(Transactor, {
      inModal: true,
      Content: Donater,
      contentProps: args,
    });
    //eslint-disable-next-line
  }, [args]);
  return showDonater;
}
