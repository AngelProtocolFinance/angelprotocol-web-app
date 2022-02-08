import DonateForm from "components/Transactors/Donater/DonateForm/DonateForm";
import { useSetModal } from "components/Nodal/Nodal";
import TransactionSuite from "components/TransactionSuite/TransactionSuite";
import { TxProps } from "components/TransactionSuite/types";
import { useCallback } from "react";
import Donater from "./Donater";
import { FundFlow, Props } from "./types";

export default function useDonater(args: FundFlow) {
  const { showModal } = useSetModal();
  const showDonater = useCallback(() => {
    showModal<TxProps<Props>>(TransactionSuite, {
      inModal: true,
      Context: Donater,
      contextProps: { Form: DonateForm, ...args },
    });
    //eslint-disable-next-line
  }, [args]);
  return showDonater;
}
