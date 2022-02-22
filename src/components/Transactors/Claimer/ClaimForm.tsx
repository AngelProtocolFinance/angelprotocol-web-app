import Claims from "./Claims";
import Status from "../Status";
import Fee from "../Fee";
import { useGetter, useSetter } from "store/accessors";
import useClaimEstimator from "./useClaimEstimator";
import { claimUnstakedHalo } from "services/transaction/transactors/claimUnStakedHalo";
import { useCallback } from "react";

export default function ClaimForm() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const { tx, wallet } = useClaimEstimator();
  const dispatch = useSetter();
  const claim = useCallback(() => {
    dispatch(claimUnstakedHalo({ tx: tx!, wallet }));
    //eslint-disable-next-line
  }, [wallet, tx]);

  return (
    <div className="bg-white grid p-4 rounded-md w-full">
      <Status />
      <Claims />
      <Fee />
      <button
        onClick={claim}
        disabled={form_loading || !!form_error}
        className="bg-angel-orange disabled:bg-grey-accent p-1 rounded-md mt-2 uppercase text-sm text-white font-bold"
        type="submit"
      >
        {form_loading ? "estimating fee.." : "claim"}
      </button>
    </div>
  );
}
