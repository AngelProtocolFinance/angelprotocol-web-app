import { useFieldArray, useFormContext } from "react-hook-form";
import { StrategyFormValues } from "./types";
import { AccountType } from "types/contracts";
import TableSection, { Cells } from "components/TableSection";
import { maskAddress } from "helpers";
import Pie, { UNALLOCATED_COLOR, pieColors } from "../Pie";
import Selection from "./Selection";
import VaultField from "./VaultField";
import useUpdateStrategy from "./useUpdateStrategy";

type Props = { type: AccountType };
export default function Form({ type }: Props) {
  const {
    handleSubmit,
    formState: { isDirty, isValid },
  } = useFormContext<StrategyFormValues>();
  const { fields, append, remove } = useFieldArray<StrategyFormValues>({
    name: "allocations", // unique name for your Field Array
  });
  const { proposeStrategyUpdate, allocations, total } = useUpdateStrategy(type);

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
        <VaultField
          key={"investable__assets"}
          name="Investable assets"
          idx={idxAfterLastField}
          remove={remove}
          color={UNALLOCATED_COLOR.bg}
        />
        // <div
        //   key={idxAfterLastField}
        //   className="flex gap-2 p-2 items-center text-emerald-200 font-heading"
        // >
        //   <span>Investable assets</span>
        //   <span className="font-bold">{100 - total} %</span>
        // </div>
      );
    }
    return _fields;
  }

  return (
    <form
      className="mt-6 grid content-start gap-x-4"
      onSubmit={handleSubmit(proposeStrategyUpdate)}
    >
      <Pie
        series={allocations.map(({ percentage }) =>
          isNaN(percentage) ? 0 : percentage
        )}
        max={100}
        classes="w-[15rem] justify-self-center"
      />

      <table>
        <TableSection type="thead" rowClass="">
          <Cells type="th" cellClass="">
            <>Vault</>
            <>%</>
          </Cells>
        </TableSection>
        <TableSection type="tbody" rowClass="">
          {renderFields()}
        </TableSection>
      </table>

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

      {/* <Selection selected={fields} select={append} type={type} /> */}
    </form>
  );
}
