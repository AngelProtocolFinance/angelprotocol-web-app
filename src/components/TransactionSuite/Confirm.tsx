import { useFormContext } from "react-hook-form";

import { useGetter } from "../../store/accessors";
import { Values } from "../Withdraw/types";
import { useSetModal } from "../../components/Nodal/Nodal";
import toCurrency from "helpers/toCurrency";
import useConfirmWithdraw from "../Withdraw/useConfirmWithdraw";

export default function Confirm() {
  const { hideModal } = useSetModal();
  const { watch } = useFormContext<Values>();
  const { fee, stage } = useGetter((state) => state.transaction);
  const handleConfirmWithdraw = useConfirmWithdraw();
  const amount = watch("withdrawAmount");
  const total = watch("total");

  function handleProceed() {
    handleConfirmWithdraw();
  }

  return (
    <div className="p-3 md:p-6 bg-white-grey w-full rounded-xl shadow-lg overflow-hidden relative">
      <h3 className="mb-1 text-lg text-angel-grey text-center font-semibold font-heading">
        {stage?.content?.message}
      </h3>
      <div className="p-2 font-heading text-angel-grey">
        <p className="w-full mb-1 uppercase grid grid-cols-2 items-center">
          <span className="mr-4 text-xs text-right font-semibold">
            Amount :
          </span>
          <span className="">~{toCurrency(amount, 6)} UST</span>
        </p>
        <p className="w-full mb-1 uppercase grid grid-cols-2 items-center">
          <span className="mr-4 text-xs text-right font-semibold">
            TX Fee :
          </span>
          <span className="">~{toCurrency(fee, 6)} UST</span>
        </p>
        <p className="w-full mb-1 uppercase grid grid-cols-2 items-center">
          <span className="mr-4 text-xs text-right font-semibold">Total :</span>
          <span className="">~{toCurrency(total, 6)} UST</span>
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
          onClick={hideModal}
          className="m-auto uppercase hover:bg-angel-orange hover:text-white-grey hover:border-opacity-0 rounded-lg w-28 h-8 text-angel-orange border-2 border-angel-orange text-sm font-bold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
