import { useCallback } from "react";
import { useSetModal } from "components/Modal/Modal";
import Transactor, { TxProps } from "../Transactor";
import Donater from "./Donater";
import { FundFlow, Props } from "./types";

export default function useDonater(args: FundFlow) {
  const { showModal } = useSetModal();
  const showDonater = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, {
      inModal: true,
      Content: Donater,
      contentProps: args,
    });
    //eslint-disable-next-line
  }, [args]);
  return showDonater;
}
