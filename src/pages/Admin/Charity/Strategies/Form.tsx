import { ErrorMessage } from "@hookform/error-message";
import { useFieldArray, useFormContext } from "react-hook-form";
import Icon from "components/Icon";
import PieChart from "./PieChart";
import RemainingAllocation from "./RemainingAllocation";
import Selection from "./Selection";
import { StrategyFormValues } from "./schema";

export default function Form() {
  const { register } = useFormContext<StrategyFormValues>();
  const { fields, append, remove } = useFieldArray<StrategyFormValues>({
    name: "allocations", // unique name for your Field Array
  });

  return (
    <form className="mt-6 col-span-2 grid grid-cols-2">
      <h3 className="text-xl font-bold uppercase text-zinc-50 mb-2 col-span-2">
        Strategies
      </h3>
      {(fields.length > 0 && (
        <div className="grid gap-4 p-4 border-2 border-zinc-50/20 rounded-md justify-self-start self-start">
          {fields.map((field, i) => (
            <div
              key={field.id}
              className="flex gap-2 p-2 items-center relative text-zinc-50/80 font-heading"
            >
              <p className="flex items-center gap-2">
                <Icon type="Safe" size={36} />
                <span className="uppercase text-2xl font-extrabold">
                  {field.vault}
                </span>
              </p>

              <input
                className="block w-fit bg-transparent focus:outline-none border-b border-zinc-50/10 text-right text-lg"
                {...register(`allocations.${i}.percentage`, {
                  valueAsNumber: true,
                })}
              />
              <span>%</span>
              <button type="button" onClick={() => remove(i)}>
                <Icon
                  size={18}
                  type="Close"
                  className="text-rose-400 hover:text-rose-300 active:text-rose-500"
                />
              </button>
              <ErrorMessage
                name={`allocations.${i}.percentage`}
                as="span"
                className="absolute right-4 -bottom-2 text-xs text-rose-300"
              />
            </div>
          ))}
        </div>
      )) || <p>select strategies below</p>}
      <PieChart />
      <RemainingAllocation />
      <Selection selected={fields} select={append} />
    </form>
  );
}
