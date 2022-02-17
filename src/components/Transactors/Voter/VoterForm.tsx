import { useFormContext } from "react-hook-form";
import { useGetter } from "store/accessors";
import Fee from "../Fee";
import Status from "../Status";
import Amount from "./Amount";
import { Values } from "./types";
import Option from "./Option";
import useVote from "./useVote";

export default function VoterForm() {
  const {
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = useFormContext<Values>();
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const vote = useVote();
  const isDisabled =
    isSubmitting || form_loading || !!form_error || !isValid || !isDirty;
  return (
    <form
      onSubmit={handleSubmit(vote)}
      className="bg-white grid p-4 rounded-md w-full max-w-lg"
      autoComplete="off"
    >
      <Status />
      <h4 className="text-xl text-angel-grey text-center uppercase">Vote</h4>
      <p className="text-center text-angel-grey p-2 border-2 border-angel-blue rounded-md border-opacity-20 my-4">
        Votes cannot be changed after submission. Staked HALO used to vote is
        locked and cannot be withdrawn until the poll has finished.
      </p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Option label="yes" vote="yes" />
        <Option label="no" vote="no" />
      </div>
      <Amount />
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
