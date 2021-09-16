import toCurrency from "components/helpers/toCurrency";
import { useModalCloser } from "components/Modal/Modal";
import { useFormikContext } from "formik";
import { useGetStatus, useSetStatus } from "./Donator";
import { Steps } from "./types";

export default function Estimates() {
  //Estimates is inside Modal tree under Popup
  const closeModal = useModalCloser();
  //Estimates is inside Donator
  const { details } = useGetStatus();
  const formattedAmount = toCurrency(details?.amount);
  const formattedFee = toCurrency(details?.fee);
  const setStatus = useSetStatus();
  //Estimates is inside Formik
  const { submitForm, resetForm } = useFormikContext();

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
      <div className="p-2 font-heading text-angel-blue font-semibold text-angel-blue font-semibold">
        <p className="w-full mb-1 uppercase grid grid-cols-2 items-center">
          <span className="mr-2 text-xs">Amount :</span>
          <span className="font-semibold">{formattedAmount} UST</span>
        </p>
        <p className="w-full mb-1 uppercase grid grid-cols-2 items-center">
          <span className="mr-2 text-xs">TX Fee :</span>
          <span className="font-semibold">{formattedFee} UST</span>
        </p>
      </div>

      <button
        className="my-3 w-32 text-center bg-angel-orange py-2 rounded-lg shadow-sm font-bold font-heading text-white text-sm uppercase"
        onClick={handleProceed}
      >
        Donate
      </button>

      <button
        className="w-32 text-center bg-red-400 py-2 rounded-lg shadow-sm font-bold font-heading text-white text-sm uppercase"
        onClick={handleCancel}
      >
        cancel
      </button>
    </>
  );
}
