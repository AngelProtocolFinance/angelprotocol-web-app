import { Link, Outlet, useFetcher, useLoaderData } from "@remix-run/react";
import TableSection, { Cells } from "components/TableSection";
import { LoaderCircle, Minus, Plus } from "lucide-react";
import { useAdminContext } from "pages/Admin/Context";
import { toast } from "sonner";
import type { EndowAdmin } from "types/aws";

export default function List() {
  const admins = useLoaderData() as EndowAdmin[];

  return (
    <div className="overflow-x-auto">
      <Link
        className="justify-self-end btn-blue px-4 py-1.5 text-sm gap-2 mb-2"
        to="add"
      >
        <Plus size={16} />
        <span>Invite user</span>
      </Link>
      <Loaded members={admins} />
    </div>
  );
}

type LoadedProps = {
  classes?: string;
  members: EndowAdmin[];
};
function Loaded({ members, classes = "" }: LoadedProps) {
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
            <DeleteForm email={member.email} />

            <>{member.email}</>
            <>{member.givenName ?? "-"}</>
            <>{member.familyName ?? "-"}</>
          </Cells>
        ))}
      </TableSection>
      {/** render add form */}
      <Outlet />
    </table>
  );
}

function DeleteForm({ email }: { email: string }) {
  const { user } = useAdminContext();
  async function handleRemove(toRemove: string) {
    if (toRemove === user.email) {
      return toast.error("Can't delete self");
    }
    if (!window.confirm(`Are you sure you want to remove ${toRemove}?`)) return;
    fetcher.submit(
      { toRemove },
      { action: ".", method: "POST", encType: "application/json" }
    );
  }

  const fetcher = useFetcher({ key: `admin-${email}` });

  return (
    <fetcher.Form method="POST" className="relative">
      <button
        disabled={fetcher.state !== "idle"}
        onClick={() => handleRemove(email)}
        type="button"
        className=" disabled:text-navy-l2 hover:text-red active:text-red absolute-center"
      >
        {fetcher.state !== "idle" ? (
          <LoaderCircle size={16} className="animate-spin" />
        ) : (
          <Minus size={16} />
        )}
      </button>
    </fetcher.Form>
  );
}
