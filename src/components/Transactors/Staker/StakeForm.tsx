import { useFormContext } from "react-hook-form";
import { useGetter, useSetter } from "store/accessors";
import Amount from "./Amount";
import { HaloStakingValues } from "./types";
import Status from "../Status";
import Fee from "../Fee";
import useEstimator from "./useEstimator";
import { useCallback } from "react";
import { haloStakeUnstake } from "services/transaction/haloStakeUnstake";

export default function StakeForm() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const { handleSubmit } = useFormContext<HaloStakingValues>();
  const dispatch = useSetter();
  const { tx, wallet } = useEstimator();
  const stake = useCallback(
    (data: HaloStakingValues) => {
      dispatch(haloStakeUnstake({ wallet, tx: tx!, stakingValues: data }));
    },
    [wallet, tx]
  );

  return (
    <form
      onSubmit={handleSubmit(stake)}
      className="bg-white grid p-4 rounded-md w-full"
      autoComplete="off"
    >
      <Status />
      <Amount />
      <Fee />
      <button
        disabled={form_loading || !!form_error}
        className="bg-angel-orange disabled:bg-grey-accent p-1 rounded-md mt-2 uppercase text-sm text-white font-bold"
        type="submit"
      >
        {form_loading ? "estimating fee.." : "proceed"}
      </button>
    </form>
  );
}
