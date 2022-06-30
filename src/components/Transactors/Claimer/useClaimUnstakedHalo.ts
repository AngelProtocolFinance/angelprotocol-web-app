import { invalidateJunoTags } from "services/juno";
import { govTags, junoTags, multicallTags } from "services/juno/tags";
import { useGetter, useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import useClaimEstimator from "./useClaimEstimator";

export default function useClaimUnstakedHalo() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const { tx, wallet } = useClaimEstimator();
  const dispatch = useSetter();

  function claimUnstakedHalo() {
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
    claimUnstakedHalo,
    isFormLoading: form_loading,
    isSubmitDisabled: form_loading || form_error !== null,
  };
}
