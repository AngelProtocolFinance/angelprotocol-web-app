import { VoteValues as V } from "./types";
import Reason from "./Reason";
import VoteOption from "./VoteOption";
import useVote from "./useVote";

export default function Form() {
  const { vote, isSubmitDisabled } = useVote();
  return (
    <form
      onSubmit={vote}
      className="font-work text-gray-d2 dark:text-white bg-white dark:bg-blue-d6 border border-gray-l2 dark:border-bluegray -mt-4 grid p-4 pt-8 rounded w-full max-w-lg"
      autoComplete="off"
    >
      <div className="grid grid-cols-2 gap-4 mb-6 mt-2">
        <VoteOption<V> label="yes" vote="yes" />
        <VoteOption<V> label="no" vote="no" />
      </div>
      <Reason />

      <button
        disabled={isSubmitDisabled}
        className="btn btn-orange rounded px-4 py-2"
        type="submit"
      >
        proceed
      </button>
    </form>
  );
}
