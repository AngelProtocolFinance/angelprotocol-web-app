import { useCallback } from "react";
import { FundFlow, Props } from "@types-component/donater";
import { TxProps } from "@types-component/transactor";
import { useModalContext } from "contexts/ModalContext/ModalContext";
import DonateForm from "components/Transactors/Donater/DonateForm/DonateForm";
import Transactor from "../Transactor";
import Donater from "./Donater";

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
