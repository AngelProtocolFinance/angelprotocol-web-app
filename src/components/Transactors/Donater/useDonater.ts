import { useCallback } from "react";
import { useModalContext } from "components/ModalContext/ModalContext";
import DonateForm from "components/Transactors/Donater/DonateForm/DonateForm";
import Transactor, { TxProps } from "../Transactor";
import Donater from "./Donater";
import { FundFlow, Props } from "./types";

export default function useDonater(args: FundFlow) {
  const { showModal } = useModalContext();
  const showDonater = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, {
      inModal: true,
      Content: Donater,
      contentProps: { Form: DonateForm, ...args },
    });
    //eslint-disable-next-line
  }, [args]);
  return showDonater;
}
