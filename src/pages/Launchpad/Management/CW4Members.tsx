import { useFieldArray, useFormContext } from "react-hook-form";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";

const defaultValue = { addr: "", weight: 1 };
const name = "members";

export default function CW4Members() {
  const { trigger } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name,
  });

  async function handleAppend() {
    append(defaultValue);
    await trigger();
  }
  async function handleRemove(index: number) {
    remove(index);
    await trigger();
  }

  return (
    <div className="mb-8 grid content-start border border-prim p-8 rounded">
      <h3 className="text-xl font-bold mb-8">Members</h3>
      <table>
        <TableSection
          type="thead"
          rowClass="border-b border-prim bg-orange-l6 dark:bg-blue-d7"
        >
          <Cells type="th" cellClass="text-xs uppercase text-left py-3 px-4">
            <>Member</>
            <>Vote weight</>
            <></>
          </Cells>
        </TableSection>
        <TableSection type="tbody" rowClass="border-b border-prim">
          {fields.map((field, idx) => (
            <MemberField key={field.id} idx={idx} onRemove={handleRemove} />
          ))}
        </TableSection>
      </table>

      <button
        type="button"
        onClick={handleAppend}
        className="flex items-center gap-2 justify-self-end text-sm uppercase"
      >
        add another member
      </button>
    </div>
  );
}

type Props = {
  idx: number;
  onRemove(idx: number): void;
};

function MemberField({ idx, onRemove }: Props) {
  const { register } = useFormContext();
  return (
    <Cells type="td" cellClass="relative">
      <input
        className="w-full focus:outline-none bg-transparent py-3 px-4 text-sm"
        {...register(`${name}.${idx}.addr`)}
        key={idx} // important to include key with field's id
      />

      <input
        className="w-min focus:outline-none bg-transparent py-3 px-4 text-sm"
        {...register(`${name}.${idx}.weight`)}
        key={idx} // important to include key with field's id
      />

      <button
        className="text-center absolute-center"
        type="button"
        onClick={() => onRemove(idx)}
      >
        <Icon
          type="CloseCircle"
          size={22}
          className="text-gray-d1 dark:text-gray"
        />
      </button>
    </Cells>
  );
}
