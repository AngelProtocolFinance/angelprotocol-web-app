import Fee from "../Fee";
import Status from "../Status";
import Amount from "./Amount";
import Option from "./Option";
import useVote from "./useVote";

export default function VoterForm() {
  const { vote, isFormLoading, isSubmitDisabled } = useVote();
  return (
    <form
      onSubmit={vote}
      className="bg-white-grey grid p-4 rounded-md w-full max-w-lg"
      autoComplete="off"
    >
      <Status />
      <h4 className="text-xl text-angel-grey text-center uppercase">Vote</h4>
      <p className="text-center text-angel-grey p-2 border-2 border-angel-blue/20 rounded-md my-4">
        Votes cannot be changed after submission. Staked HALO used to vote is
        locked and cannot be withdrawn until the poll has finished.
      </p>
      <div className="grid grid-cols-2 mb-6">
        <Option label="yes" vote="yes" />
        <Option label="no" vote="no" />
      </div>
      <Amount />
      <Fee />
      <button
        disabled={isSubmitDisabled}
        className="bg-angel-orange disabled:bg-grey-accent p-2 rounded-md mt-2 uppercase text-sm text-white font-bold"
        type="submit"
      >
        {isFormLoading ? "estimating fee.." : "proceed"}
      </button>
    </form>
  );
}
