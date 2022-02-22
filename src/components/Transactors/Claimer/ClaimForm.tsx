import Claims from "./Claims";
import Status from "../Status";
import { useFormContext } from "react-hook-form";
import { Values } from "./types";
import Fee from "../Fee";
import { useGetter, useSetter } from "store/accessors";
import useEstimator from "components/Withdrawer/useEstimator";
import { useCallback } from "react";
import { claimUnstakedHalo } from "services/transaction/claimUnStakedHalo";

export default function ClaimForm() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const { handleSubmit } = useFormContext<Values>();
  const { tx, wallet } = useEstimator();
  const dispatch = useSetter();
  const claim = useCallback(() => {
    dispatch(claimUnstakedHalo({ tx: tx!, wallet }));
  }, [wallet, tx]);

  return (
    <form
      onSubmit={handleSubmit(claim)}
      className="bg-white grid p-4 rounded-md w-full"
      autoComplete="off"
    >
      <Status />
      <Claims />
      <Fee />
      <button
        disabled={form_loading || !!form_error}
        className="bg-angel-orange disabled:bg-grey-accent p-1 rounded-md mt-2 uppercase text-sm text-white font-bold"
        type="submit"
      >
        {form_loading ? "estimating fee.." : "claim"}
      </button>
    </form>
  );
}
