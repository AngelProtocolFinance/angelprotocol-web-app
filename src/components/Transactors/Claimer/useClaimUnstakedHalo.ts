import { govTags, terraTags, userTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import { useGetter, useSetter } from "store/accessors";
import { useSetModal } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import useClaimEstimator from "./useClaimEstimator";

export default function useClaimUnstakedHalo() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const { showModal } = useSetModal();
  const { tx, wallet } = useClaimEstimator();
  const dispatch = useSetter();

  function claimUnstakedHalo() {
    dispatch(
      sendTerraTx({
        wallet,
        tx: tx!,
        tagPayloads: [
          terra.util.invalidateTags([
            { type: terraTags.gov, id: govTags.staker },
            { type: terraTags.gov, id: govTags.halo_balance },
            { type: terraTags.user, id: userTags.halo_balance },
          ]),
        ],
      })
    );
    showModal(TransactionPrompt, {});
  }

  return {
    claimUnstakedHalo,
    isFormLoading: form_loading,
    isSubmitDisabled: form_loading || form_error !== null,
  };
}
