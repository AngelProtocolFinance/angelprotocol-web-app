import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useGetter, useSetter } from "store/accessors";
import { vote } from "services/transaction/transactors/vote";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import Fee from "../Fee";
import Status from "../Status";
import useVoteEstimator from "./useVoteEstimator";
import { VoteValues } from "./types";
import VoteOption from "../VoteOption";
import Amount from "./Amount";

export default function VoterForm() {
  const {
    handleSubmit,
    formState: { isValid, isDirty },
  } = useFormContext<VoteValues>();
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const dispatch = useSetter();
  const { showModal } = useSetModal();

  const { wallet, tx } = useVoteEstimator();
  const _vote = useCallback(() => {
    dispatch(vote({ wallet, tx: tx! }));
    showModal(TransactionPrompt, {});
    //eslint-disable-next-line
  }, [wallet, tx]);

  const isDisabled = form_loading || !!form_error || !isValid || !isDirty;
  return (
    <form
      onSubmit={handleSubmit(_vote)}
      className="bg-white-grey grid p-4 rounded-md w-full max-w-lg"
      autoComplete="off"
    >
      <Status />
      <h4 className="text-xl text-angel-grey text-center uppercase">Vote</h4>
      <p className="text-center text-angel-grey p-2 border-2 border-angel-blue rounded-md border-opacity-20 my-4">
        Votes cannot be changed after submission. Staked HALO used to vote is
        locked and cannot be withdrawn until the poll has finished.
      </p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <VoteOption label="yes" vote="yes" />
        <VoteOption label="no" vote="no" />
      </div>
      <Amount />
      <Fee />
      <button
        disabled={isDisabled}
        className="bg-angel-orange disabled:bg-grey-accent p-2 rounded-md mt-2 uppercase text-sm text-white font-bold"
        type="submit"
      >
        {form_loading ? "estimating fee.." : "proceed"}
      </button>
    </form>
  );
}
