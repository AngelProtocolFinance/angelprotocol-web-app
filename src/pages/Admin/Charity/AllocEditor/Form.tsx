import { useFieldArray, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { StrategyFormValues } from "./types";
import { AdminParams } from "pages/Admin/types";
import { maskAddress } from "helpers";
import Pie, { pieColors } from "../Pie";
import { getAccounType } from "../helpers";
import Selection from "./Selection";
import VaultField from "./VaultField";
import useUpdateStrategy from "./useUpdateStrategy";

export default function Form() {
  const { type } = useParams<AdminParams>();
  const accountType = getAccounType(type);
  const {
    handleSubmit,
    formState: { isDirty, isValid },
  } = useFormContext<StrategyFormValues>();
  const { fields, append, remove } = useFieldArray<StrategyFormValues>({
    name: "allocations", // unique name for your Field Array
  });
  const { proposeStrategyUpdate, allocations, total } =
    useUpdateStrategy(accountType);

  function renderFields() {
    const _fields = fields.map((field, i) => (
      <VaultField
        key={field.id}
        name={maskAddress(field.vault)}
        idx={i}
        remove={remove}
        color={pieColors[i].bg}
      />
    ));
    const idxAfterLastField = fields.length;
    if (total < 100) {
      _fields.push(
        <div
          key={idxAfterLastField}
          className="flex gap-2 p-2 items-center text-emerald-200 font-heading"
        >
          <span>Investable assets</span>
          <span className="font-bold">{100 - total} %</span>
        </div>
      );
    }
    return _fields;
  }

  return (
    <form
      className="mt-6 grid content-start gap-x-4"
      onSubmit={handleSubmit(proposeStrategyUpdate)}
    >
      <h3 className="text-2xl font-extrabold uppercase text-zinc-50 mb-10 col-span-2">
        Edit {accountType} allocations
      </h3>
      <div className="grid gap-4 p-4 border-2 border-zinc-50/20 rounded-md justify-self-end self-center">
        {renderFields()}
        {total > 100 && (
          <div className="g">
            <p className="text-left text-rose-400 font-bold font-heading uppercase">
              <span className="text-sm pr-2">total</span>
              <span>{total}%</span>
            </p>
            <p className="text-sm text-rose-300 text-left">
              Total allocation should not be greater than 100%
            </p>
          </div>
        )}
        <button
          disabled={!isDirty || !isValid || total > 100}
          type="submit"
          className="justify-self-end text-xs font-bold px-4 py-2 bg-sky-500 disabled:bg-zinc-300 hover:bg-sky-400 uppercase rounded-md text-zinc-50"
        >
          propose changes
        </button>
      </div>
      <Pie
        series={allocations.map(({ percentage }) =>
          isNaN(percentage) ? 0 : percentage
        )}
        max={100}
        classes="w-[15rem]"
      />
      <h4 className="text-lg uppercase text-zinc-50/80 mt-10">
        Investment options
      </h4>
      <Selection selected={fields} select={append} type={accountType} />
    </form>
  );
}
