import { useState } from "react";
import { TPermissions } from "./types";
import TableSection, { Cells } from "components/TableSection";
import useHandleScreenResize, { SCREEN_SM } from "hooks/useHandleScreenResize";
import Permission from "./Permission";

type RowState = { [K in keyof TPermissions]?: boolean };

export default function PermissionsTable({ classes = "" }) {
  const [open, setOpen] = useState<RowState>({});

  useHandleScreenResize(
    (screen) =>
      screen >= SCREEN_SM
        ? setOpen({
            accountFees: true,
            contributorAllowlist: true,
            beneficiaryAllowlist: true,
            maturityAllowlist: true,
            maturityTime: true,
            donationSplitParams: true,
            profile: true,
            investments: true,
          })
        : setOpen({}),
    {
      debounceTime: 100,
      shouldAttachListener: true,
      shouldCallOnResizeOnLoad: true,
    }
  );

  function handleToggle(name: keyof TPermissions) {
    setOpen((open) => ({ ...open, [name]: !open[name] }));
  }

  return (
    <table
      className={`${classes} table-fixed max-sm:grid outline outline-1 outline-prim rounded w-full`}
    >
      <TableSection
        type="thead"
        classes="max-sm:grid max-sm:grid-cols-12 max-sm:border-b border-gray-l3 dark:border-bluegray bg-orange-l6 dark:bg-blue-d7 text-left"
        rowClass="max-sm:contents uppercase text-xs font-bold border-b border-gray-l3 dark:border-bluegray bg-orange-l6 dark:bg-blue-d7"
      >
        <Cells
          type="th"
          cellClass="px-4 py-4 border-r border-gray-l3 dark:border-bluegray last:border-r-0"
        >
          <th className="sm:hidden" />
          <th className="max-sm:col-start-2 max-sm:border-r-0">action</th>
          <th className="max-sm:hidden">admin wallet</th>
          <th className="max-sm:hidden">delegate</th>
          <th className="max-sm:hidden">delegate address</th>
          <th className="max-sm:hidden">expiry</th>
          <th className="max-sm:hidden">actions</th>
        </Cells>
      </TableSection>
      <TableSection
        classes="max-sm:contents"
        type="tbody"
        rowClass="max-sm:grid max-sm:grid-cols-12 border-b border-gray-l3 dark:border-bluegray last:border-0"
      >
        <Permission
          title="Changes to account fees"
          name="accountFees"
          onToggle={handleToggle}
          isOpen={!!open.accountFees}
        />
        <Permission
          title="Changes to beneficiary allowlist"
          name="beneficiaryAllowlist"
          onToggle={handleToggle}
          isOpen={!!open.beneficiaryAllowlist}
        />
        <Permission
          title="Changes to contributor allowlist"
          name="contributorAllowlist"
          onToggle={handleToggle}
          isOpen={!!open.contributorAllowlist}
        />
        <Permission
          title="Changes to maturity allowlist"
          name="maturityAllowlist"
          onToggle={handleToggle}
          isOpen={!!open.maturityAllowlist}
        />
        <Permission
          title="Changes to maturity time"
          name="maturityTime"
          onToggle={handleToggle}
          isOpen={!!open.maturityTime}
        />
        <Permission
          title="Changes to donation split parameters"
          name="donationSplitParams"
          onToggle={handleToggle}
          isOpen={!!open.donationSplitParams}
        />
        <Permission
          title="Changes to profile"
          name="profile"
          onToggle={handleToggle}
          isOpen={!!open.profile}
        />
        <Permission
          title="Investments"
          name="investments"
          onToggle={handleToggle}
          isOpen={!!open.profile}
        />
      </TableSection>
    </table>
  );
}
