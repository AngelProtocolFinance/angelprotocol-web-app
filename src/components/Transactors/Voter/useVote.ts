import { useFormContext } from "react-hook-form";
import { VoteValues } from "./types";
import { invalidateJunoTags } from "services/juno";
import { junoTags, multicallTags } from "services/juno/tags";
import { useGetter, useSetter } from "store/accessors";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import useVoteEstimator from "./useVoteEstimator";

export default function useVote() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const {
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<VoteValues>();

  const { tx, wallet } = useVoteEstimator();
  const dispatch = useSetter();

  function vote() {
    dispatch(
      sendTerraTx({
        wallet,
        tx: tx!,
        tagPayloads: [
          invalidateJunoTags([
            { type: junoTags.gov },
            { type: junoTags.multicall, id: multicallTags.terraBalances },
          ]),
        ],
      })
    );
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
