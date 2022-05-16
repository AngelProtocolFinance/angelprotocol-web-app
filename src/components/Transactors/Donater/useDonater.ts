import { useCallback } from "react";
import { FundFlow } from "@types-component/donater";
import { TxProps } from "@types-component/transactor";
import { useModalContext } from "contexts/ModalContext/ModalContext";
import Transactor from "../Transactor";
import Donater from "./Donater";

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
