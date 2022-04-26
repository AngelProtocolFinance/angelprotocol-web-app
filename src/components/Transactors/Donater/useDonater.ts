import { FundFlow, Props } from "@types-component/donater";
import { useCallback } from "react";
import { useSetModal } from "components/Modal/Modal";
import DonateForm from "components/Transactors/Donater/DonateForm/DonateForm";
import Transactor, { TxProps } from "../Transactor";
import Donater from "./Donater";

export default function useDonater(args: FundFlow) {
  const { showModal } = useSetModal();
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
