import { useCallback } from "react";
import { useModalContext } from "contexts/ModalContext";
import ReceiptForm from "components/Receipter/ReceiptForm";
import Receipter from "components/Receipter/Receipter";
import { TxProps } from "components/Transactors";
import Transactor from "components/Transactors";

export default function useDonor() {
  const { showModal } = useModalContext();

  const showDonor = useCallback((txHash: string) => {
    showModal<TxProps<{ txHash: string }>>(Transactor, {
      inModal: true,
      Content: Donor,
      contentProps: { txHash },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return showDonor;
}

const Donor = (props: { txHash: string }) => {
  return (
    <Receipter txHash={props.txHash}>
      <ReceiptForm />
    </Receipter>
  );
};
