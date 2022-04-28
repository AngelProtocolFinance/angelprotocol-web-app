import { useCallback } from "react";
import { TxProps } from "@types-component/transactor";
import { useSetModal } from "components/Modal/Modal";
import ReceiptForm from "components/Receipter/ReceiptForm";
import Receipter from "components/Receipter/Receipter";
import Transactor from "components/Transactors/Transactor";

export default function useDonor() {
  const { showModal } = useSetModal();

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

// export type DonorProps =
const Donor = (props: { txHash: string }) => {
  return (
    <Receipter txHash={props.txHash}>
      <ReceiptForm />
    </Receipter>
  );
};
