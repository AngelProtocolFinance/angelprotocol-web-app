import { gov, multicall, tags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { useModalContext } from "components/ModalContext/ModalContext";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import useClaimEstimator from "./useClaimEstimator";

export default function useClaimUnstakedHalo() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const { showModal } = useModalContext();
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
            { type: tags.multicall, id: multicall.terraBalances },
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
