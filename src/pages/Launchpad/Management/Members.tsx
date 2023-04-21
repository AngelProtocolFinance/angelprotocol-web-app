import { useFieldArray, useFormContext } from "react-hook-form";
import { FV } from "./types";
import { Member } from "slices/launchpad/types";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import { isEmpty } from "helpers";
import { Group, GroupTitle } from "../common/Form";
import Info from "../common/Info";
import MemberForm from "./MemberForm";

const name: keyof FV = "members";

type MemberItem = Member & { idx: number };

export default function Members({ classes = "" }) {
  const { showModal } = useModalContext();
  const { getValues } = useFormContext<FV>();
  const { fields, append, remove, update } = useFieldArray({
    name,
  });

  async function handleAdd(member: Member) {
    append(member);
  }
  async function handleRemove(index: number) {
    remove(index);
  }
  async function handleEdit(member: MemberItem) {
    showModal(MemberForm, {
      onChange: (m) => update(member.idx, m),
      initial: member,
      added: getValues("members").map((m) => m.addr),
    });
  }

  return (
    <Group className={classes}>
      <GroupTitle className="mb-8">Members</GroupTitle>
      <button
        type="button"
        onClick={() =>
          showModal(MemberForm, {
            onChange: handleAdd,
            added: getValues("members").map((m) => m.addr),
          })
        }
        className="btn-outline-filled sm:justify-self-end text-sm py-3 px-8 gap-3 mb-5"
      >
        <Icon type="Plus" />
        <span>Add member</span>
      </button>
      {isEmpty(fields) ? (
        <Info classes="mt-4">
          No members have been added yet - would be set to the creator of this
          AST
        </Info>
      ) : (
        <table className="table-fixed rounded outline outline-1 outline-prim">
          <TableSection
            type="thead"
            rowClass="border-b border-prim bg-orange-l6 dark:bg-blue-d7 rounded"
          >
            <Cells type="th" cellClass="text-xs uppercase text-left py-3 px-4">
              <>member</>
              <>Vote weight</>
              <></>
            </Cells>
          </TableSection>
          <TableSection
            type="tbody"
            rowClass="border-b border-prim last:border-none even:bg-orange-l6 even:dark:bg-blue-d7"
          >
            {fields.map((field, idx) => (
              <Row
                key={field.id}
                idx={idx}
                onRemove={handleRemove}
                onEdit={handleEdit}
              />
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
  onEdit(member: MemberItem): void;
};

function Row({ idx, onRemove, onEdit }: Props) {
  const { getValues } = useFormContext<FV>();
  const member = getValues(`members.${idx}`);
  const { addr, weight } = member;
  return (
    <Cells type="td" cellClass="py-3 px-4 text-sm">
      <div className="truncate w-[4.8rem] sm:w-28 md:w-full">{addr}</div>
      <td className="font-work">
        {weight}{" "}
        <button
          onClick={() => onEdit({ ...member, idx })}
          type="button"
          className="inline-block underline"
        >
          (change)
        </button>
      </td>

      <td className="w-14 h-full relative">
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
