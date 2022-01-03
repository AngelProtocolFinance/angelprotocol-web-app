import Amount from "./Amount";
import Status from "./Status";
import { useFormContext } from "react-hook-form";
import { Values } from "../Claimer/types";
import useClaimer from "./useClaimer";
import Fee from "./Fee";
import { useGetter } from "store/accessors";

export default function ClaimForm() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<Values>();
  const claimer = useClaimer();

  return (
    <form
      onSubmit={handleSubmit(claimer)}
      className="bg-white grid p-4 rounded-md w-full"
      autoComplete="off"
    >
      <Status />
      <Amount />
      <Fee />
      <button
        disabled={isSubmitting || form_loading || !!form_error}
        className="bg-angel-orange disabled:bg-grey-accent p-1 rounded-md mt-2 uppercase text-sm text-white font-bold"
        type="submit"
      >
        {form_loading ? "estimating fee.." : "proceed"}
      </button>
    </form>
  );
}
