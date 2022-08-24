import { useFormContext } from "react-hook-form";
import { VoteValues } from "./types";
import { apesTags, customTags, invalidateApesTags } from "services/apes";
import { invalidateJunoTags } from "services/juno";
import { junoTags } from "services/juno/tags";
import { useChain } from "contexts/ChainGuard";
import { useGetter, useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import Gov from "contracts/Gov";

export default function useVote() {
  const { form_loading } = useGetter((state) => state.transaction);
  const {
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<VoteValues>();

  const chain = useChain();
  const dispatch = useSetter();

  function vote(data: VoteValues) {
    const contract = new Gov(chain);
    const voteMsg = contract.createVoteMsg(
      +data.poll_id,
      data.vote,
      +data.amount
    );

    dispatch(
      sendCosmosTx({
        chain,
        msgs: [voteMsg],
        tagPayloads: [
          invalidateJunoTags([{ type: junoTags.gov }]),
          invalidateApesTags([{ type: apesTags.custom, id: customTags.chain }]),
        ],
      })
    );
  }

  return {
    vote: handleSubmit(vote),
    isSubmitDisabled: !isValid || !isDirty || isSubmitting,
    isFormLoading: form_loading,
  };
}
