import { govTags, multicallTags, terraTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { useGetter, useSetter } from "store/accessors";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import useClaimEstimator from "./useClaimEstimator";

export default function useClaimUnstakedHalo() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const { tx, providerId } = useClaimEstimator();
  const dispatch = useSetter();

  function claimUnstakedHalo() {
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
    claimUnstakedHalo,
    isFormLoading: form_loading,
    isSubmitDisabled: form_loading || form_error !== null,
  };
}
