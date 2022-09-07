import { ErrorMessage } from "@hookform/error-message";
import Icon from "components/Icon";
import { maskAddress, roundDownToNum } from "helpers";
import Pie from "../Pie";
import Selection from "./Selection";
import useUpdateStrategy from "./useUpdateStrategy";

export default function Form() {
  const {
    proposeStrategyUpdate,
    allocations,
    total,
    fields,
    append,
    remove,
    register,
  } = useUpdateStrategy();
  return (
    <form
      className="mt-6 col-span-2 grid grid-cols-2"
      onSubmit={proposeStrategyUpdate}
    >
      <h3 className="text-xl font-bold uppercase text-zinc-50 mb-2 col-span-2">
        Strategies
      </h3>
      {(fields.length > 0 && (
        <div className="grid gap-4 p-4 border-2 border-zinc-50/20 rounded-md justify-self-end self-center mr-4">
          {fields.map((field, i) => (
            <div
              key={field.id}
              className="flex gap-2 p-2 items-center relative text-zinc-50/80 font-heading"
            >
              <p className="flex items-center gap-2">
                <Icon type="Safe" size={36} />
                <span className="font-mono">{maskAddress(field.vault)}</span>
              </p>

              <input
                className="block w-fit bg-transparent focus:outline-none border-b border-zinc-50/10 text-right text-lg"
                {...register(`allocations.${i}.percentage`, {
                  setValueAs(value) {
                    const num = Number(value);
                    if (!isNaN(num)) {
                      //limit to 2 digits saved in form context for submission
                      return roundDownToNum(num, 2);
                    } else {
                      return 0;
                    }
                  },
                })}
              />
              <span>%</span>
              <button type="button" onClick={() => remove(i)} tabIndex={-1}>
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
          {(total > 100 && (
            <div className="g">
              <p className="text-left text-rose-400 font-bold font-heading uppercase">
                <span className="text-sm pr-2">total</span>
                <span>{total}%</span>
              </p>
              <p className="text-sm text-rose-300 text-left">
                Total allocation should not be greater than 100%
              </p>
            </div>
          )) || (
            <button
              type="submit"
              className="justify-self-end text-xs font-bold px-4 py-2 bg-sky-500 hover:bg-sky-400 uppercase rounded-md text-zinc-50"
            >
              propose changes
            </button>
          )}
        </div>
      )) || <p className="text-zinc-50/80">select strategies below</p>}
      <Pie
        series={allocations.map(({ percentage }) =>
          isNaN(percentage) ? 0 : percentage
        )}
        max={100}
      />
      {/* <RemainingAllocation /> */}
      <Selection selected={fields} select={append} />
    </form>
  );
}
