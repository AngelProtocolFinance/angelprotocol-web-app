import Amount from "./Amount";
import Status from "./Status";
import { useFormContext } from "react-hook-form";
import { Values } from "components/Donater/types";
import useStaker from "../Staker/useStaker";
import Fee from "./Fee";

export default function StakeForm() {
  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useFormContext<Values>();
  const staker = useStaker();
  const loading = watch("loading");
  const error = watch("form_error");
  return (
    <form
      onSubmit={handleSubmit(staker)}
      className="bg-white grid p-4 rounded-md w-96"
      autoComplete="off"
    >
      <Status />
      <Amount />
      <Fee />

      <button
        disabled={isSubmitting || loading || !!error}
        className="bg-angel-orange disabled:bg-grey-accent p-1 rounded-md mt-2 uppercase text-sm text-white font-bold"
        type="submit"
      >
        {loading ? "estimating fee.." : "proceed"}
      </button>
    </form>
  );
}
