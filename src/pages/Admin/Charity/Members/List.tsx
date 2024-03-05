import ContentLoader from "components/ContentLoader";
import Icon from "components/Icon";
import QueryLoader from "components/QueryLoader";
import TableSection, { Cells } from "components/TableSection";
import { useAuthenticatedUser } from "contexts/Auth";
import { useModalContext } from "contexts/ModalContext";
import { useAdminContext } from "pages/Admin/Context";
import { useDeleteEndowAdminMutation, useUsersQuery } from "services/aws/users";
import AddForm from "./AddForm";

export default function List() {
  const { showModal } = useModalContext();
  const { id } = useAdminContext();

  const queryState = useUsersQuery(id);
  return (
    <div>
      <button
        type="button"
        disabled={queryState.isLoading}
        className="justify-self-end btn-orange px-4 py-1.5 text-sm gap-2 mb-2"
        onClick={() =>
          showModal(AddForm, { added: queryState.data || [], endowID: id })
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
  members: string[];
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
      className={`${classes} w-full text-sm rounded border border-separate border-spacing-0 border-gray-l4`}
    >
      <TableSection
        type="thead"
        rowClass="bg-orange-l6 dark:bg-blue-d7 divide-x divide-prim"
      >
        <Cells
          type="th"
          cellClass="px-3 py-4 text-xs uppercase font-semibold text-left first:rounded-tl last:rounded-tr"
        >
          <td className="w-8" />
          <>Email</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="even:bg-orange-l6 dark:odd:bg-blue-d6 dark:even:bg-blue-d7 divide-x divide-prim"
        selectedClass="bg-orange-l5 dark:bg-blue-d4"
      >
        {members.map((member) => (
          <Cells
            key={member}
            type="td"
            cellClass="p-3 border-t border-gray-l4 max-w-[256px] truncate first:rounded-bl last:rounded-br"
          >
            <td className="relative">
              <button
                disabled={isLoading}
                onClick={() => handleRemove(member)}
                type="button"
                className=" disabled:text-gray hover:text-red active:text-red absolute-center"
              >
                <Icon type="Delete" size={16} />
              </button>
            </td>

            <>{member}</>
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
