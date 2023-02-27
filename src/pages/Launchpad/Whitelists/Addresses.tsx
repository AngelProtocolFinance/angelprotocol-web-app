import { useFieldArray, useFormContext } from "react-hook-form";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import { isEmpty } from "helpers";
import AddressForm from "./AddressForm";

type Props = {
  name: string;
  title: string;
  memberName: string;
  emptyMsg: string;
};

export default function Addresses({
  title,
  name,
  memberName,
  emptyMsg,
}: Props) {
  const { showModal } = useModalContext();
  const { fields, append, remove } = useFieldArray({
    name,
  });

  async function handleAdd(addr: string) {
    append(addr);
  }
  async function handleRemove(index: number) {
    remove(index);
  }

  return (
    <div className="mb-8 grid content-start border border-prim p-8 rounded">
      <h3 className="text-xl font-bold mb-8">{title}</h3>
      <button
        type="button"
        onClick={() =>
          showModal(AddressForm, { onAdd: handleAdd, name: memberName })
        }
        className="btn-outline-filled min-w-[15rem] justify-self-end text-sm py-3 gap-3 mb-5"
      >
        <Icon type="Plus" />
        <span>Add {memberName}</span>
      </button>
      {isEmpty(fields) ? (
        <p>{emptyMsg}</p>
      ) : (
        <table className="table-fixed rounded outline outline-prim">
          <TableSection
            type="tbody"
            rowClass="border-b border-prim divide-x divide-prim last:border-none"
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
      <p className="w-96">{addr}</p>
      <div className="w-full h-full relative">
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
      </div>
    </Cells>
  );
}
