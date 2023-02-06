import { useFormContext } from "react-hook-form";
import { FormValues, Props } from "./types";
import Fields from "./Fields";
import useSubmit from "./useSubmit";

export default function Form({ type }: Props) {
  const {
    handleSubmit,
    watch,
    formState: { isDirty, isValid },
  } = useFormContext<FormValues>();
  const { submit } = useSubmit(type);

  const allocations = watch("allocations");

  const total = allocations.reduce((total, curr) => total + curr.percentage, 0);

  return (
    <form className="content-start" onSubmit={handleSubmit(submit)}>
      <h3 className="font-bold text-lg mb-6">Update {type} strategy</h3>

      <Fields classes="mt-4" type={type} />

      <button
        disabled={!isDirty || !isValid || total > 100}
        type="submit"
        className="font-heading justify-self-end text-xs font-bold px-4 py-2 btn-blue rounded-sm"
      >
        update strategy
      </button>

      <h4 className="text-lg font-bold">Choose positions for the plan</h4>
    </form>
  );
}
