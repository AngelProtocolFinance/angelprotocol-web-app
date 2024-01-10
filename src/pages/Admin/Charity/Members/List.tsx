import { useAdminContext } from "pages/Admin/Context";
import { useUsersQuery } from "services/aws/users";
import QueryLoader from "components/QueryLoader";
import TableSection, { Cells } from "components/TableSection";

export default function Loader() {
  const { id } = useAdminContext();
  const queryState = useUsersQuery(id);
  return (
    <QueryLoader
      queryState={queryState}
      classes={{ container: "mt-4 border-t pt-4 border-prim" }}
      messages={{
        loading: "Loading members...",
        error: "Failed to get members",
        empty: "No members found.",
      }}
    >
      {(members) => (
        <div className="grid col-span-full overflow-x-auto">
          <Table members={members} />
        </div>
      )}
    </QueryLoader>
  );
}

type TableProps = {
  classes?: string;
  members: string[];
};
function Table({ members, classes = "" }: TableProps) {
  return (
    <table
      className={`${classes} w-full text-sm rounded border border-separate border-spacing-0 border-prim`}
    >
      <TableSection
        type="thead"
        rowClass="bg-orange-l6 dark:bg-blue-d7 divide-x divide-prim"
      >
        <Cells
          type="th"
          cellClass="px-3 py-4 text-xs uppercase font-semibold text-left first:rounded-tl last:rounded-tr"
        >
          <></>
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
            cellClass="p-3 border-t border-prim max-w-[256px] truncate first:rounded-bl last:rounded-br"
          >
            <>--</>
            <>{member}</>
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}
