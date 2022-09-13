import { VoteValues as V } from "./types";
import Status from "components/Transactors/Status";
import VoteOption from "components/Transactors/VoteOption";
import Reason from "./Reason";
import useVote from "./useVote";

export default function Form() {
  const { vote, isSubmitDisabled } = useVote();
  return (
    <form
      onSubmit={vote}
      className="bg-white-grey grid p-4 rounded-md w-full max-w-lg"
      autoComplete="off"
    >
      <Status />
      <div className="grid grid-cols-2 gap-4 mb-6 mt-2">
        <VoteOption<V> label="yes" vote="yes" />
        <VoteOption<V> label="no" vote="no" />
      </div>
      <Reason />

      <button
        disabled={isSubmitDisabled}
        className="bg-angel-orange disabled:bg-grey-accent p-1 rounded-md mt-2 uppercase text-sm text-white font-bold"
        type="submit"
      >
        proceed
      </button>
    </form>
  );
}
