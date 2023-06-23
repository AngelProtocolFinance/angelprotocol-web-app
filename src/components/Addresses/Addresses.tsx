import {
  FieldValues,
  Path,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { useModalContext } from "contexts/ModalContext";
import { isEmpty } from "helpers";
import Icon from "../Icon";
import Info from "../Status/Info";
import TableSection, { Cells } from "../TableSection";
import AddressForm from "./AddForm";

type Props<T extends FieldValues, K extends Path<T>> = {
  name: T[K] extends string[] ? K : never;
  title: string;
  memberName: string;
  emptyMsg: string;
  classes?: string;
};

export default function Addresses<T extends FieldValues, K extends Path<T>>({
  title,
  name,
  memberName,
  emptyMsg,
  classes = "",
}: Props<T, K>) {
  const { showModal } = useModalContext();
  const { getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: name,
  });

  async function handleAdd(addr: string) {
    append(addr as any);
  }
  async function handleRemove(index: number) {
    remove(index);
  }

  return (
    <div className={`${classes} grid content-start border border-prim rounded`}>
      <h4 className="text-xl font-bold mb-8">{title}</h4>
      <button
        type="button"
        onClick={() =>
          showModal(AddressForm, {
            onAdd: handleAdd,
            name: memberName,
            added: getValues(name),
          })
        }
        className="btn-outline-filled min-w-[13.43rem] sm:justify-self-end text-sm py-3 gap-3 mb-5 group-disabled:hidden"
      >
        <Icon type="Plus" />
        <span>Add {memberName}</span>
      </button>
      {isEmpty(fields) ? (
        <Info>{emptyMsg}</Info>
      ) : (
        <table className="table-fixed rounded outline outline-1 outline-prim">
          <TableSection
            type="tbody"
            rowClass="border-b border-prim divide-x divide-prim last:border-none odd:bg-orange-l6 odd:dark:bg-blue-d7"
          >
            {fields.map((field, idx) => (
              <Row
                key={field.id}
                idx={idx}
                onRemove={handleRemove}
                name={name}
              />
            ))}
          </TableSection>
        </table>
      )}
    </div>
  );
}

type RowProps = {
  name: string;
  idx: number;
  onRemove(idx: number): void;
};

function Row({ idx, onRemove, name }: RowProps) {
  const { getValues } = useFormContext();
  const addr = getValues(`${name}.${idx}`);
  return (
    <Cells type="td" cellClass="py-3 px-4 text-sm">
      <div className="truncate w-24 sm:w-full">{addr}</div>
      <td className="w-16 h-full relative">
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
      </td>
    </Cells>
  );
}
