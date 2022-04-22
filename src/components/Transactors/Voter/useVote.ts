import { useFormContext } from "react-hook-form";
import { terraTags, userTags } from "types/services/terra";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import { useGetter, useSetter } from "store/accessors";
import { useSetModal } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { VoteValues } from "./types";
import useVoteEstimator from "./useVoteEstimator";

export default function useVote() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const {
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<VoteValues>();

  const { wallet, tx } = useVoteEstimator();
  const { showModal } = useSetModal();
  const dispatch = useSetter();

  function vote() {
    dispatch(
      sendTerraTx({
        wallet,
        tx: tx!,
        tagPayloads: [
          terra.util.invalidateTags([
            { type: terraTags.gov },
            { type: terraTags.user, id: userTags.halo_balance },
          ]),
        ],
      })
    );
    showModal(TransactionPrompt, {});
  }

  return {
    vote: handleSubmit(vote),
    isSubmitDisabled:
      !isValid ||
      !isDirty ||
      form_loading ||
      form_error !== null ||
      isSubmitting,
    isFormLoading: form_loading,
  };
}
