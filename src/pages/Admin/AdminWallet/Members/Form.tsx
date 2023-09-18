import { FormHTMLAttributes } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FV } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import { Info } from "components/Status";
import TableSection, { Cells } from "components/TableSection";
import { Reset, Submit } from "components/admin";
import AddForm from "./AddForm";

const name: keyof FV = "members";

export default function Form(props: FormHTMLAttributes<HTMLFormElement>) {
  const { showModal } = useModalContext();
  const {
    getValues,
    watch,
    setValue,
    formState: { isDirty },
  } = useFormContext<FV>();
  const { fields, append, remove } = useFieldArray({
    name,
  });

  const members = watch("members");
  const action = watch("action");

  async function handleAdd(member: string) {
    append(member);
    if (action !== "add") {
      setValue("action", "add");
    }
  }
  async function handleRemove(index: number) {
    remove(index);
    if (action !== "remove") {
      setValue("action", "remove");
    }
  }

  return (
    <form
      {...props}
      className="grid content-start border border-prim rounded p-4 @lg:p-8"
    >
      <h4 className="text-2xl font-body mb-8">Members</h4>
      {action !== "initial" && (
        <Info classes="-mt-4 mb-4">
          {action === "add" ? "Adding members.." : "Removing members.."}
        </Info>
      )}
      {action !== "remove" && (
        <button
          type="button"
          className="btn-outline-filled @lg:justify-self-end mb-5 text-sm flex gap-x-3"
          onClick={() =>
            showModal(AddForm, {
              initial: getValues("initial"),
              onAdd: handleAdd,
              added: members,
            })
          }
        >
          <Icon type="Plus" />
          <span>add member</span>
        </button>
      )}

      <table className="table-fixed rounded outline outline-1 outline-prim">
        <TableSection
          type="thead"
          rowClass="border-b border-prim bg-orange-l6 dark:bg-blue-d7 rounded"
        >
          <Cells type="th" cellClass="text-xs uppercase text-left py-3 px-4">
            <>member</>
            <></>
          </Cells>
        </TableSection>
        <TableSection
          type="tbody"
          rowClass="border-b border-prim last:border-none even:bg-orange-l6 even:dark:bg-blue-d7"
        >
          {fields.map((field, idx, array) => (
            <Row
              key={field.id}
              idx={idx}
              onRemove={handleRemove}
              currNum={array.length}
              action={action}
            />
          ))}
        </TableSection>
      </table>
      <div className="flex justify-start gap-3 w-full group-disabled:hidden mt-6">
        <Reset disabled={!isDirty}>Reset changes</Reset>
        <Submit>Submit changes</Submit>
      </div>
    </form>
  );
}

type Props = {
  idx: number;
  onRemove(idx: number): void;
  currNum: number;
  action: FV["action"];
};

function Row({ idx, onRemove, currNum, action }: Props) {
  const { getValues } = useFormContext<FV>();
  const member = getValues(`members.${idx}`);

  return (
    <Cells type="td" cellClass="py-3 px-4 text-sm">
      <div className="truncate w-[4.8rem] sm:w-28 md:w-full">{member}</div>
      <td className="w-14 h-full relative">
        {currNum > 1 && (action === "initial" || action === "remove") && (
          /** don't allow removing all members */ <button
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
        )}
      </td>
    </Cells>
  );
}
