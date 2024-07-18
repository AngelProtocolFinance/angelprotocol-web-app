import ContentLoader from "components/ContentLoader";
import Icon from "components/Icon";
import QueryLoader from "components/QueryLoader";
import TableSection, { Cells } from "components/TableSection";
import { useAuthenticatedUser } from "contexts/Auth";
import { useModalContext } from "contexts/ModalContext";
import { useAdminContext } from "pages/Admin/Context";
import {
  useDeleteEndowAdminMutation,
  useEndowAdminsQuery,
} from "services/aws/endow-admins";
import type { EndowAdmin } from "types/aws";
import AddForm from "./AddForm";

export default function List() {
  const { showModal } = useModalContext();
  const { id } = useAdminContext();

  const queryState = useEndowAdminsQuery(id);
  return (
    <div>
      <button
        type="button"
        disabled={queryState.isLoading}
        className="justify-self-end btn-blue px-4 py-1.5 text-sm gap-2 mb-2"
        onClick={() =>
          showModal(AddForm, {
            added: (queryState.data || []).map((admin) => admin.email),
            endowID: id,
          })
        }
      >
        <Icon type="Plus" />
        <span>Invite user</span>
      </button>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: <Skeleton />,
          error: "Failed to get members",
          empty: "No members found.",
        }}
      >
        {(members) => <Loaded members={members} />}
      </QueryLoader>
    </div>
  );
}

type LoadedProps = {
  classes?: string;
  members: EndowAdmin[];
};
function Loaded({ members, classes = "" }: LoadedProps) {
  const { email: user } = useAuthenticatedUser();
  const { id } = useAdminContext();
  const [removeUser, { isLoading }] = useDeleteEndowAdminMutation();

  async function handleRemove(toRemove: string) {
    if (toRemove === user) return window.alert("Can't delete self");
    if (!window.confirm(`Are you sure you want to remove ${toRemove}?`)) return;

    const result = await removeUser({ email: toRemove, endowID: id });
    if ("error" in result) return window.alert("Failed to remove user");
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
                <Icon type="Delete" size={16} />
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

function Skeleton() {
  return (
    <div className="grid gap-y-1 mt-2">
      <ContentLoader className="h-12 w-full rounded" />
      <ContentLoader className="h-12 w-full rounded" />
      <ContentLoader className="h-12 w-full rounded" />
      <ContentLoader className="h-12 w-full rounded" />
    </div>
  );
}
