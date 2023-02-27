import { useFieldArray, useFormContext } from "react-hook-form";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import { isEmpty } from "helpers";

const defaultValue = "";
const name = "contributors";

export default function Contributors() {
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
      <h3 className="text-xl font-bold mb-8">Contributors</h3>

      {isEmpty(fields) ? (
        <p>anyone can contribute</p>
      ) : (
        <table className="border border-prim rounded table-fixed">
          <TableSection type="tbody" rowClass="border-b border-prim">
            {fields.map((field, idx) => (
              <Row key={field.id} idx={idx} onRemove={handleRemove} />
            ))}
          </TableSection>
        </table>
      )}

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
        className="focus:outline-none bg-transparent py-3 px-4 text-sm"
        {...register(`${name}.${idx}`)}
      />

      <button
        className="text-center"
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
