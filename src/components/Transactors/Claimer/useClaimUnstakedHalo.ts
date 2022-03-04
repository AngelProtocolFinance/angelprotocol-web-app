import { useSetModal } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { gov, tags, user } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "services/transaction/transactors/sendTerraTx";
import { useGetter, useSetter } from "store/accessors";
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
            { type: tags.gov, id: gov.staker },
            { type: tags.gov, id: gov.halo_balance },
            { type: tags.user, id: user.halo_balance },
          ]),
        ],
      })
    );
    showModal(TransactionPrompt, {});
  }

  return {
    claimUnstakedHalo,
    isFormLoading: form_loading,
    isSubmitDisabled: form_loading || !form_error,
  };
}
