import { NavLink, Outlet } from "@remix-run/react";
import TableSection, { Cells } from "components/TableSection";
import { Plus } from "lucide-react";
import type { LoaderData } from "./api";
import { DeleteForm } from "./delete-form";

interface IList extends LoaderData {}
export function List(props: IList) {
  return (
    <div className="overflow-x-auto">
      <NavLink
        className="justify-self-end btn-blue px-4 py-1.5 text-sm gap-2 mb-2"
        to="add"
      >
        <Plus size={16} />
        <span>Invite user</span>
      </NavLink>
      <Loaded {...props} />
      {/** render add form */}
      <Outlet />
    </div>
  );
}

interface LoadedProps extends LoaderData {
  classes?: string;
}
function Loaded({ admins, classes = "", user }: LoadedProps) {
  return (
    <table
      className={`${classes} w-full text-sm rounded-sm border border-separate border-spacing-0 border-blue-l2`}
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
        {admins.map((member) => (
          <Cells
            key={member.email}
            type="td"
            cellClass="p-3 border-t border-blue-l2 max-w-[256px] truncate first:rounded-bl last:rounded-br"
          >
            <DeleteForm email={user.email} />

            <>{member.email}</>
            <>{member.givenName ?? "-"}</>
            <>{member.familyName ?? "-"}</>
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}
