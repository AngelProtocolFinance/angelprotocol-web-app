import { useFormContext } from "react-hook-form";
import { HaloStakingValues } from "./types";
import { invalidateJunoTags } from "services/juno";
import { govTags, junoTags, multicallTags } from "services/juno/tags";
import { useGetter, useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors/sendCosmosTx";
import useStakingEstimator from "./useStakingEstimator";

export default function useStakeUnstake() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const {
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<HaloStakingValues>();

  const { tx, wallet } = useStakingEstimator();
  const dispatch = useSetter();

  function stakeOrUnstake() {
    dispatch(
      sendCosmosTx({
        wallet,
        tx: tx!,
        tagPayloads: [
          invalidateJunoTags([
            { type: junoTags.gov, id: govTags.staker },
            { type: junoTags.gov, id: govTags.halo_balance },
            { type: junoTags.multicall, id: multicallTags.terraBalances },
          ]),
        ],
      })
    );
  }

  return {
    stakeOrUnstake: handleSubmit(stakeOrUnstake),
    isSubmitDisabled:
      !isValid ||
      !isDirty ||
      form_loading ||
      form_error !== null ||
      isSubmitting,
    isFormLoading: form_loading,
  };
}
