import { useSetModal } from "components/Modal/Modal";
import Receipter from "components/Receipter/Receipter";
import ReceiptForm from "components/Receipter/ReceiptForm";
import Transactor, { TxProps } from "components/Transactors/Transactor";
import { useCallback } from "react";

export default function useDonor(txHash: string) {
  const { showModal } = useSetModal();

  const showDonor = useCallback(() => {
    showModal<TxProps<{ txHash: string }>>(Transactor, {
      inModal: true,
      Content: Donor,
      contentProps: { txHash },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txHash]);

  return showDonor;
}

// export type DonorProps =
const Donor = (props: { txHash: string }) => {
  return (
    <Receipter txHash={props.txHash}>
      <ReceiptForm />
    </Receipter>
  );
};
