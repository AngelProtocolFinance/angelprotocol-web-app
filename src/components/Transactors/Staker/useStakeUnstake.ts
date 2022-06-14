import { useFormContext } from "react-hook-form";
import { HaloStakingValues } from "./types";
import { govTags, multicallTags, terraTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { useGetter, useSetter } from "store/accessors";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import useStakingEstimator from "./useStakingEstimator";

export default function useStakeUnstake() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const {
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<HaloStakingValues>();

  const { tx, providerId } = useStakingEstimator();
  const dispatch = useSetter();

  function stakeOrUnstake() {
    dispatch(
      sendTerraTx({
        providerId,
        tx: tx!,
        tagPayloads: [
          terra.util.invalidateTags([
            { type: terraTags.gov, id: govTags.staker },
            { type: terraTags.gov, id: govTags.halo_balance },
            { type: terraTags.multicall, id: multicallTags.terraBalances },
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
