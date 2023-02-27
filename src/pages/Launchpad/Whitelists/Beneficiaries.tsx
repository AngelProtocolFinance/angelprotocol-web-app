import { useFieldArray, useFormContext } from "react-hook-form";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";

const defaultValue = "";
const name = "beneficiaries";

export default function Beneficiaries() {
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
      <h3 className="text-xl font-bold mb-8">Beneficiaries</h3>
      <table className="table-fixed">
        <TableSection
          type="thead"
          rowClass="border-b border-prim bg-orange-l6 dark:bg-blue-d7"
        >
          <Cells type="th" cellClass="text-xs uppercase text-left py-3 px-4">
            <p className="w-80">Member</p>
            <></>
          </Cells>
        </TableSection>
        <TableSection type="tbody" rowClass="border-b border-prim">
          {fields.map((field, idx) => (
            <Row key={field.id} idx={idx} onRemove={handleRemove} />
          ))}
        </TableSection>
      </table>

      <button
        type="button"
        onClick={handleAppend}
        className="btn-outline-filled justify-self-end text-sm py-3 px-8 gap-3 mt-5"
      >
        <Icon type="Plus" />
        <span>Add contributor</span>
      </button>
    </div>
  );
}

type Props = {
  idx: number;
  onRemove(idx: number): void;
};

function Row({ idx, onRemove }: Props) {
  const { register } = useFormContext();
  return (
    <Cells type="td" cellClass="relative">
      <input
        className="w-full focus:outline-none bg-transparent py-3 px-4 text-sm"
        {...register(`${name}.${idx}`)}
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
