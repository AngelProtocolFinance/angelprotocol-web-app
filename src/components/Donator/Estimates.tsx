import { useModalCloser } from "components/Modal/Modal";
import { useFormikContext } from "formik";
import { useGetStatus, useSetStatus } from "./Donator";
import { Steps } from "./types";

export default function Estimates() {
  //Estimates is inside Modal tree under Popup
  const closeModal = useModalCloser();
  //Estimates is inside Donator
  const status = useGetStatus();
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
      <p className="text-angel-grey mb-1 uppercase">
        Amount: UST {status.details?.amount}
      </p>
      <p className="text-angel-grey mb-1 uppercase">
        Fee: UST {status.details?.fee}
      </p>

      <button
        className="my-2 w-32 text-center bg-angel-orange py-2 rounded-lg shadow-sm font-bold font-heading text-white text-sm uppercase"
        onClick={handleProceed}
      >
        proceed
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
