import { useCallback } from "react";
import { claimUnstakedHalo } from "services/transaction/transactors/claimUnStakedHalo";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import { useGetter, useSetter } from "store/accessors";
import useClaimEstimator from "./useClaimEstimator";
import Status from "../Status";
import Fee from "../Fee";
import Claims from "./Claims";

export default function ClaimForm() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const { showModal } = useSetModal();
  const { tx, wallet } = useClaimEstimator();
  const dispatch = useSetter();
  const claim = useCallback(() => {
    dispatch(claimUnstakedHalo({ tx: tx!, wallet }));
    showModal(TransactionPrompt, {});
    //eslint-disable-next-line
  }, [wallet, tx]);

  return (
    <div className="bg-white-grey grid p-4 rounded-md w-full">
      <Status />
      <Claims />
      <Fee />
      <button
        onClick={claim}
        disabled={form_loading || !!form_error}
        className="bg-angel-orange disabled:bg-grey-accent p-2 rounded-md mt-2 uppercase text-sm text-white font-bold"
        type="submit"
      >
        {form_loading ? "estimating fee.." : "claim"}
      </button>
    </div>
  );
}
