import { useFormContext } from "react-hook-form";
import { useGetter, useSetter } from "store/accessors";
import { haloStakeUnstake } from "services/transaction/transactors/haloStakeUnstake";
import Amount from "./Amount";
import { HaloStakingValues } from "./types";
import Status from "../Status";
import Fee from "../Fee";
import useStakingEstimator from "./useStakingEstimator";
import { useCallback } from "react";
import { useSetModal } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";

export default function StakeForm() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const {
    handleSubmit,
    formState: { isValid, isDirty },
  } = useFormContext<HaloStakingValues>();
  const { showModal } = useSetModal();
  const dispatch = useSetter();
  const { tx, wallet } = useStakingEstimator();
  const stake = useCallback(
    (data: HaloStakingValues) => {
      dispatch(haloStakeUnstake({ wallet, tx: tx!, stakingValues: data }));
      showModal(TransactionPrompt, {});
    },
    //eslint-disable-next-line
    [wallet, tx]
  );

  return (
    <form
      onSubmit={handleSubmit(stake)}
      className="bg-white-grey grid p-4 rounded-md w-full"
      autoComplete="off"
    >
      <Status />
      <Amount />
      <Fee />
      <button
        disabled={form_loading || !!form_error || !isValid || !isDirty}
        className="bg-angel-orange disabled:bg-grey-accent p-2 rounded-md mt-2 uppercase text-sm text-white font-bold"
        type="submit"
      >
        {form_loading ? "estimating fee.." : "proceed"}
      </button>
    </form>
  );
}
