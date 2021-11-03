import { useGetStatus, useSetStatus } from "./Withdraw";
import toCurrency from "helpers/toCurrency";
import { EstimatesProps, Steps } from "./types";

export default function Estimates(props: EstimatesProps) {
  const { message, estimates } = useGetStatus();
  const setStatus = useSetStatus();

  const amount = toCurrency(estimates?.amount);
  const fee = toCurrency(estimates?.txFee);
  const total = toCurrency(estimates?.total);

  function handleProceed() {
    setStatus({ step: Steps.ready });
    props.handleConfirm();
  }

  return (
    <div className="p-3 md:p-6 bg-white-grey w-full max-w-xs rounded-xl shadow-lg overflow-hidden relative">
      <h3 className="mb-1 text-lg text-angel-grey text-center font-semibold font-heading">
        {message}
      </h3>
      <div className="p-2 font-heading text-angel-grey">
        <p className="w-full mb-1 uppercase grid grid-cols-2 items-center">
          <span className="mr-4 text-xs text-right font-semibold">
            Amount :
          </span>
          <span className="">~{amount} UST</span>
        </p>
        <p className="w-full mb-1 uppercase grid grid-cols-2 items-center">
          <span className="mr-4 text-xs text-right font-semibold">
            TX Fee :
          </span>
          <span className="">~{fee} UST</span>
        </p>
        <p className="w-full mb-1 uppercase grid grid-cols-2 items-center">
          <span className="mr-4 text-xs text-right font-semibold">Total :</span>
          <span className="">~{total} UST</span>
        </p>
      </div>

      <div className="flex flex-row mt-2">
        <button
          onClick={handleProceed}
          className="m-auto uppercase hover:bg-blue-accent bg-angel-blue rounded-lg w-28 h-8 text-white-grey text-sm font-bold"
        >
          Proceed
        </button>
        <button
          onClick={props.onCloseModal}
          className="m-auto uppercase hover:bg-angel-orange hover:text-white-grey hover:border-opacity-0 rounded-lg w-28 h-8 text-angel-orange border-2 border-angel-orange text-sm font-bold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
