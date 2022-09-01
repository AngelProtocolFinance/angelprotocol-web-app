import { ErrorMessage } from "@hookform/error-message";
import { useFieldArray, useFormContext } from "react-hook-form";
import Icon from "components/Icon";
import { roundDown, roundDownToNum } from "helpers";
import RemainingAllocation from "./RemainingAllocation";
import Selection from "./Selection";
import { StrategyFormValues } from "./schema";

export default function Form() {
  const { register } = useFormContext<StrategyFormValues>();
  const { fields, append, prepend, remove, swap, move, insert } =
    useFieldArray<StrategyFormValues>({
      name: "allocations", // unique name for your Field Array
    });

  return (
    <form className="mt-6 justify-self-start">
      <h3 className="text-xl font-bold uppercase text-zinc-50 mb-2">
        Strategies
      </h3>
      {(fields.length > 0 && (
        <div className="grid gap-4 p-4 border-2 border-zinc-50/20 rounded-md">
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
                className="absolute right-0 -bottom-4"
              />
            </div>
          ))}
        </div>
      )) || <p>select strategies below</p>}
      <RemainingAllocation />
      <Selection selected={fields} select={append} />
    </form>
  );
}
