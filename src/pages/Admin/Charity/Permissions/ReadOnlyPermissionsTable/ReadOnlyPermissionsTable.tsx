import { useState } from "react";
import { TPermissions } from "../types";
import TableSection, { Cells } from "components/TableSection";
import useHandleScreenResize, { SCREEN_SM } from "hooks/useHandleScreenResize";
import Permission from "./Permission";

type RowState = { [K in keyof TPermissions]?: boolean };

type Props = TPermissions & { classes?: string };

export default function PermissionsTable({
  classes = "",
  ...permissions
}: Props) {
  const [open, setOpen] = useState<RowState>({});

  useHandleScreenResize(
    (screen) =>
      screen >= SCREEN_SM
        ? setOpen({
            accountFees: true,
            allowList: true,
            donationSplitParams: true,
            profile: true,
          })
        : setOpen({}),
    {
      debounceTime: 100,
      shouldAttachListener: true,
      shouldCallOnResizeOnLoad: true,
    }
  );

  const handleToggle = (name: keyof TPermissions) => () => {
    setOpen((open) => ({ ...open, [name]: !open[name] }));
  };

  return (
    <table
      className={`${classes} table-fixed max-sm:grid outline outline-1 outline-prim rounded w-full`}
    >
      <TableSection
        type="thead"
        classes="max-sm:grid max-sm:grid-cols-12 max-sm:border-b border-prim bg-orange-l6 dark:bg-blue-d7 text-left"
        rowClass="max-sm:contents uppercase text-xs font-bold border-b border-prim bg-orange-l6 dark:bg-blue-d7"
      >
        <Cells
          type="th"
          cellClass="px-4 py-4 border-r border-prim last:border-r-0"
        >
          <th className="sm:hidden" />
          <th className="max-sm:col-start-2 max-sm:border-r-0 sm:w-80">
            action
          </th>
          <th className="max-sm:hidden sm:w-28">admin wallet</th>
          <th className="max-sm:hidden sm:w-28">delegate</th>
          <th className="max-sm:hidden">delegate address</th>
          <th className="max-sm:hidden sm:w-36">actions</th>
        </Cells>
      </TableSection>
      <TableSection
        classes="max-sm:contents"
        type="tbody"
        rowClass="max-sm:grid max-sm:grid-cols-12 border-b border-prim last:border-0"
      >
        <Permission
          {...permissions["accountFees"]}
          title="Changes to account fees"
          onToggle={handleToggle("accountFees")}
          isOpen={!!open.accountFees}
        />
        <Permission
          {...permissions["allowList"]}
          title="Changes to beneficiaries and contributors"
          onToggle={handleToggle("allowList")}
          isOpen={!!open.allowList}
        />
        <Permission
          {...permissions["donationSplitParams"]}
          title="Changes to donation split parameters"
          onToggle={handleToggle("donationSplitParams")}
          isOpen={!!open.donationSplitParams}
        />
        <Permission
          {...permissions["profile"]}
          title="Changes to profile"
          onToggle={handleToggle("profile")}
          isOpen={!!open.profile}
        />
      </TableSection>
    </table>
  );
}
