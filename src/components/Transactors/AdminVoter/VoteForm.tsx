import { useFormContext } from "react-hook-form";
import { useGetter } from "store/accessors";
import Fee from "../Fee";
import Status from "../Status";
import { AdminVoteValues as V } from "./types";
import VoteOption from "../VoteOption";
import useVote from "./useVote";

export default function VoteForm() {
  const { handleSubmit } = useFormContext<V>();
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const vote = useVote();
  const isDisabled = form_loading || !!form_error;
  return (
    <form
      onSubmit={handleSubmit(vote)}
      className="bg-white-grey grid p-4 rounded-md w-full max-w-lg"
      autoComplete="off"
    >
      <Status />
      <div className="grid grid-cols-2 gap-4 mb-6 mt-2">
        <VoteOption<V> label="yes" vote="yes" />
        <VoteOption<V> label="no" vote="no" />
      </div>
      <Fee />
      <button
        disabled={isDisabled}
        className="bg-angel-orange disabled:bg-grey-accent p-1 rounded-md mt-2 uppercase text-sm text-white font-bold"
        type="submit"
      >
        {form_loading ? "estimating fee.." : "proceed"}
      </button>
    </form>
  );
}
