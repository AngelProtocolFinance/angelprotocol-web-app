import { useSetModal } from "components/Modal/Modal";
import Receipter from "components/Receipter/Receipter";
import ReceiptForm from "components/Receipter/ReceiptForm";
import { useCallback } from "react";
import { MdOutlineClose } from "react-icons/md";

export default function useDonor(txHash: string) {
  const { showModal } = useSetModal();

  const showDonor = useCallback(() => {
    showModal(Donor, {
      inModal: true,
      txHash,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txHash]);

  return showDonor;
}

// export type DonorProps =
const Donor = (props: { inModal: boolean; txHash: string }) => {
  const { hideModal } = useSetModal();
  return (
    <div
      className={`max-w-md w-full relative ${
        props.inModal ? "bg-white rounded-md pt-4" : ""
      }`}
    >
      {props.inModal && (
        <button
          onClick={hideModal}
          className="absolute right-2 top-2 text-angel-grey hover:text-black"
        >
          <MdOutlineClose size={25} />
        </button>
      )}
      <Receipter txHash={props.txHash}>
        <ReceiptForm />
      </Receipter>
    </div>
  );
};
