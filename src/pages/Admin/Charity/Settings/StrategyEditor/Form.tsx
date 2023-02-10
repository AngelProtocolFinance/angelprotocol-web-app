import { useFormContext } from "react-hook-form";
import { FormValues, Props } from "./types";
import Fields from "./Fields";
import Vaults from "./Vaults";
import useSubmit from "./useSubmit";

export default function Form({ type }: Props) {
  const {
    handleSubmit,
    watch,
    reset,
    formState: { isDirty, isValid },
  } = useFormContext<FormValues>();
  const { submit } = useSubmit(type);

  const allocations = watch("allocations");

  return (
    <form
      className="content-start"
      onSubmit={handleSubmit(submit)}
      onReset={(e) => {
        e.preventDefault();
        reset();
      }}
    >
      <h3 className="font-bold text-lg mb-6">Update {type} strategy</h3>

      <Fields classes="mt-4" type={type} />

      <div className="flex gap-4 my-6 justify-end">
        <button
          disabled={!isDirty}
          type="reset"
          className="btn-outline-filled py-2 text-sm min-w-[8rem]"
        >
          Reset
        </button>
        <button
          disabled={!isDirty || !isValid}
          type="submit"
          className="btn-orange py-2 text-sm min-w-[8rem]"
        >
          Submit changes
        </button>
      </div>

      <h4 className="text-lg font-bold mb-6">Choose positions for the plan</h4>
      <Vaults type={type} selected={allocations} />
    </form>
  );
}
