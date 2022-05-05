import { useFormContext } from "react-hook-form";
import { multicall, tags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { useModalContext } from "components/ModalContext/ModalContext";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { VoteValues } from "./types";
import useVoteEstimator from "./useVoteEstimator";

export default function useVote() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const {
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<VoteValues>();

  const { wallet, tx } = useVoteEstimator();
  const { showModal } = useModalContext();
  const dispatch = useSetter();

  function vote() {
    dispatch(
      sendTerraTx({
        wallet,
        tx: tx!,
        tagPayloads: [
          terra.util.invalidateTags([
            { type: tags.gov },
            { type: tags.multicall, id: multicall.terraBalances },
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
