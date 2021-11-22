import toCurrency from "helpers/toCurrency";
import { useModalCloser } from "components/Modal/Modal";
import { useFormikContext } from "formik";
import { useGetStatus, useSetStatus } from "./Donator";
import { Steps } from "./types";

export default function Estimates() {
  //Estimates is inside Modal tree under Popup
  const closeModal = useModalCloser();
  //Estimates is inside Donator
  const { estimates } = useGetStatus();
  const setStatus = useSetStatus();
  //Estimates is inside Formik
  const { submitForm, resetForm } = useFormikContext();

  const amount = toCurrency(estimates?.amount, 3);
  const fee = toCurrency(estimates?.txFee, 3);
  const total = toCurrency(estimates!.amount + estimates!.txFee, 3);

  function handleProceed() {
    setStatus({ step: Steps.ready });
    submitForm();
    closeModal();
  }

  function handleCancel() {
    setStatus({ step: Steps.initial });
    closeModal();
    resetForm();
  }

  return (
    <>
      <div className="p-2 font-heading text-angel-blue font-semibold">
        <p className="w-full mb-1 uppercase grid grid-cols-2 items-center">
          <span className="mr-2 text-xs">Amount :</span>
          <span className="font-semibold">{amount} UST</span>
        </p>
        <p className="w-full mb-1 uppercase grid grid-cols-2 items-center">
          <span className="mr-2 text-xs">TX Fee :</span>
          <span className="font-semibold">{fee} UST</span>
        </p>
        <p className="w-full mb-1 uppercase grid grid-cols-2 items-center">
          <span className="mr-2 text-xs">Total :</span>
          <span className="font-semibold">{total} UST</span>
        </p>
      </div>

      <button
        className="my-3 w-32 text-center bg-angel-orange hover:bg-orange py-2 rounded-lg shadow-sm font-bold font-heading text-white text-sm uppercase"
        onClick={handleProceed}
      >
        Donate
      </button>

      <button
        className="w-32 text-center bg-red-400 hover:bg-dark-red py-2 rounded-lg shadow-sm font-bold font-heading text-white text-sm uppercase"
        onClick={handleCancel}
      >
        cancel
      </button>
    </>
  );
}
