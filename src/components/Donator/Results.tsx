import toCurrency from "helpers/toCurrency";
import { useModalCloser } from "components/Modal/Modal";
import { useFormikContext } from "formik";
import { useGetStatus, useSetStatus } from "./Donator";
import { Steps } from "./types";

export default function Results() {
  //Estimates is inside Modal tree under Popup
  const closeModal = useModalCloser();
  //Estimates is inside Donator
  const { result } = useGetStatus();
  const setStatus = useSetStatus();
  //Estimates is inside Formik
  const { resetForm } = useFormikContext();

  const received = toCurrency(result?.received, 3);
  const deposited = toCurrency(result?.deposited, 3);

  function handleShare() {
    setStatus({ step: Steps.initial });
    alert("work in progress x_x");
    resetForm();
    closeModal();
  }

  return (
    <>
      <div className="p-2 font-heading text-angel-blue font-semibold text-angel-blue font-semibold">
        <p className="w-full mb-1 uppercase grid grid-cols-2 items-center">
          <span className="mr-2 text-xs">Received :</span>
          <span className="font-semibold">{received} UST</span>
        </p>
        <p className="w-full mb-1 uppercase grid grid-cols-2 items-center">
          <span className="mr-2 text-xs">Deposited :</span>
          <span className="font-semibold">{deposited} UST</span>
        </p>
      </div>
      <a
        className="text-thin-blue"
        href={result?.url}
        target="_blank"
        rel="noreferrer"
      >
        transaction details
      </a>
      <button
        className="my-3 w-32 text-center bg-angel-orange hover:bg-orange py-2 rounded-lg shadow-sm font-bold font-heading text-white text-sm uppercase"
        onClick={handleShare}
      >
        Share
      </button>
    </>
  );
}
