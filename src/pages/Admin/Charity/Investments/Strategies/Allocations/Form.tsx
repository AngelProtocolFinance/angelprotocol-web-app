import { useFormContext } from "react-hook-form";
import { FormProps, StrategyFormValues } from "./types";
import { AccountType } from "types/contracts";
import Pie from "../Pie";
import Fields from "./Fields";
import useUpdateStrategy from "./useUpdateStrategy";

export default function Form({ type }: FormProps) {
  const {
    handleSubmit,
    watch,
    formState: { isDirty, isValid },
    getValues,
  } = useFormContext<StrategyFormValues>();
  const { proposeStrategyUpdate } = useUpdateStrategy(type);

  const currAllocations = watch("allocations");
  const initialAllocations = getValues("initialAllocations");

  const isReadOnly = getValues("isReadOnly");
  const allocations = isReadOnly ? initialAllocations : currAllocations;

  const total = allocations.reduce((total, curr) => total + curr.percentage, 0);

  return (
    <form
      className="mt-6 grid content-start text-zinc-50/80 p-3 bg-zinc-50/5 shadow-inner"
      onSubmit={handleSubmit(proposeStrategyUpdate)}
    >
      <h3 className="text-center mb-4 uppercase font-bold">
        {isReadOnly ? "Existing Strategy" : "New Strategy"}
      </h3>
      <Pie
        series={allocations.map(({ percentage }) =>
          isNaN(percentage) ? 0 : percentage
        )}
        max={100}
        classes="w-[13rem] justify-self-center"
      />
      <Fields classes="mt-4" />

      {!isReadOnly && (
        <button
          disabled={!isDirty || !isValid || total > 100}
          type="submit"
          className="font-heading justify-self-end text-xs font-bold px-4 py-2 bg-sky-500 disabled:bg-zinc-300 hover:bg-sky-400 uppercase rounded-md text-zinc-50"
        >
          update strategy
        </button>
      )}
    </form>
  );
}
