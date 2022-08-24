import Fee from "../Fee";
import Status from "../Status";
import Amount from "./Amount";
import useStakeUnstake from "./useStakeUnstake";

export default function Form() {
  const { stakeOrUnstake, isSubmitDisabled } = useStakeUnstake();
  return (
    <form
      onSubmit={stakeOrUnstake}
      className="bg-white-grey grid p-4 rounded-md w-full"
      autoComplete="off"
    >
      <Status />
      <Amount />
      <Fee />
      <button
        disabled={isSubmitDisabled}
        className="bg-angel-orange disabled:bg-grey-accent p-2 rounded-md mt-2 uppercase text-sm text-white font-bold"
        type="submit"
      >
        Proceed
      </button>
    </form>
  );
}
