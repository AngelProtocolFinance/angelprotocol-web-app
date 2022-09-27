import { VoteValues as V } from "./types";
import Fee from "../Fee";
import Status from "../Status";
import VoteOption from "../VoteOption";
import Amount from "./Amount";
import useVote from "./useVote";

export default function VoterForm() {
  const { vote, isFormLoading, isSubmitDisabled } = useVote();
  return (
    <form
      onSubmit={vote}
      className="bg-white grid p-4 rounded-md w-full max-w-lg"
      autoComplete="off"
    >
      <Status />
      <h4 className="text-xl text-angel-grey text-center uppercase">Vote</h4>
      <p className="text-center text-angel-grey p-2 border-2 border-blue/20 rounded-md my-4">
        Votes cannot be changed after submission. Staked HALO used to vote is
        locked and cannot be withdrawn until the poll has finished.
      </p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <VoteOption<V> label="yes" vote="yes" />
        <VoteOption<V> label="no" vote="no" />
      </div>
      <Amount />
      <Fee />
      <button
        disabled={isSubmitDisabled}
        className="bg-orange disabled:bg-grey-accent p-2 rounded-md mt-2 uppercase text-sm text-white font-bold"
        type="submit"
      >
        {isFormLoading ? "estimating fee.." : "proceed"}
      </button>
    </form>
  );
}
