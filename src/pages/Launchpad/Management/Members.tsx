import { useFieldArray, useFormContext } from "react-hook-form";
import { FV } from "./types";
import { Member } from "slices/launchpad/types";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import { isEmpty } from "helpers";
import { Group, GroupTitle } from "../common/Form";
import { Info } from "../common/Info";
import AddForm from "./AddForm";

const name: keyof FV = "members";

export default function Members({ classes = "" }) {
  const { showModal } = useModalContext();
  const { getValues } = useFormContext<FV>();
  const { fields, append, remove } = useFieldArray({
    name,
  });

  async function handleAdd(member: Member) {
    append(member);
  }
  async function handleRemove(index: number) {
    remove(index);
  }

  return (
    <Group className={classes}>
      <GroupTitle className="mb-8">Members</GroupTitle>
      <button
        type="button"
        onClick={() =>
          showModal(AddForm, {
            onAdd: handleAdd,
            added: getValues("members").map((m) => m.addr),
          })
        }
        className="btn-outline-filled justify-self-end text-sm py-3 px-8 gap-3 mb-5"
      >
        <Icon type="Plus" />
        <span>Add member</span>
      </button>
      {isEmpty(fields) ? (
        <Info classes="mt-4">
          No members have been added yet - would be set to the creator of this
          fund
        </Info>
      ) : (
        <table className="table-fixed rounded outline outline-1 outline-prim">
          <TableSection
            type="thead"
            rowClass="border-b border-prim bg-orange-l6 dark:bg-blue-d7 rounded"
          >
            <Cells type="th" cellClass="text-xs uppercase text-left py-3 px-4">
              <p className="w-80">Member</p>
              <>Vote weight</>
              <></>
            </Cells>
          </TableSection>
          <TableSection
            type="tbody"
            rowClass="border-b border-prim last:border-none"
          >
            {fields.map((field, idx) => (
              <Row key={field.id} idx={idx} onRemove={handleRemove} />
            ))}
          </TableSection>
        </table>
      )}
    </Group>
  );
}

type Props = {
  idx: number;
  onRemove(idx: number): void;
};

function Row({ idx, onRemove }: Props) {
  const { getValues } = useFormContext();
  const { addr, weight } = getValues(`${name}.${idx}`);
  return (
    <Cells type="td" cellClass="py-3 px-4 text-sm">
      <>{addr}</>
      <>{weight}</>

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
