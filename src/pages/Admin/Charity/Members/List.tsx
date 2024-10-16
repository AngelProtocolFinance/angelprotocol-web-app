import Prompt from "components/Prompt";
import TableSection, { Cells } from "components/TableSection";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { Minus, Plus } from "lucide-react";
import { useAdminContext } from "pages/Admin/Context";
import { useLoaderData } from "react-router-dom";
import { useDeleteEndowAdminMutation } from "services/aws/endow-admins";
import type { EndowAdmin } from "types/aws";
import AddForm from "./AddForm";

export default function List() {
  const admins = useLoaderData() as EndowAdmin[];
  const { showModal } = useModalContext();
  const { id } = useAdminContext();

  return (
    <div className="overflow-x-auto">
      <button
        type="button"
        className="justify-self-end btn-blue px-4 py-1.5 text-sm gap-2 mb-2"
        onClick={() =>
          showModal(AddForm, {
            added: (admins || []).map((admin) => admin.email),
            endowID: id,
          })
        }
      >
        <Plus size={16} />
        <span>Invite user</span>
      </button>
      <Loaded members={admins} />
    </div>
  );
}

type LoadedProps = {
  classes?: string;
  members: EndowAdmin[];
};
function Loaded({ members, classes = "" }: LoadedProps) {
  const { id, user } = useAdminContext();
  const [removeUser, { isLoading }] = useDeleteEndowAdminMutation();
  const { showModal } = useModalContext();
  const { handleError } = useErrorContext();

  async function handleRemove(toRemove: string) {
    if (toRemove === user.email)
      return showModal(Prompt, {
        type: "error",
        children: "Can't delete self",
      });

    if (!window.confirm(`Are you sure you want to remove ${toRemove}?`)) return;

    try {
      await removeUser({ email: toRemove, endowID: id }).unwrap();
    } catch (err) {
      handleError(err, { context: "removing member" });
    }
  }

  return (
    <table
      className={`${classes} w-full text-sm rounded border border-separate border-spacing-0 border-blue-l2`}
    >
      <TableSection
        type="thead"
        rowClass="bg-blue-l4 dark:bg-blue-d7 divide-x divide-blue-l2"
      >
        <Cells
          type="th"
          cellClass="px-3 py-4 text-xs uppercase font-semibold text-left first:rounded-tl last:rounded-tr"
        >
          <td className="w-8" />
          <>Email</>
          <>First name</>
          <>Last name</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="even:bg-blue-l5 dark:odd:bg-blue-d6 dark:even:bg-blue-d7 divide-x divide-blue-l2"
        selectedClass="bg-blue-l4 dark:bg-blue-d4"
      >
        {members.map((member) => (
          <Cells
            key={member.email}
            type="td"
            cellClass="p-3 border-t border-blue-l2 max-w-[256px] truncate first:rounded-bl last:rounded-br"
          >
            <td className="relative">
              <button
                disabled={isLoading}
                onClick={() => handleRemove(member.email)}
                type="button"
                className=" disabled:text-navy-l2 hover:text-red active:text-red absolute-center"
              >
                <Minus size={16} />
              </button>
            </td>

            <>{member.email}</>
            <>{member.givenName ?? "-"}</>
            <>{member.familyName ?? "-"}</>
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}
