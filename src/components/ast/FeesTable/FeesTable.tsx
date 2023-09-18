import { useState } from "react";
import { Fees } from "types/ast";
import useHandleScreenResize, { SCREEN_SM } from "hooks/useHandleScreenResize";
import TableSection, { Cells } from "../../TableSection";
import Fee from "./Fee";

type RowState = { [K in keyof Fees]?: boolean };

export default function FeesTable({ classes = "" }) {
  const [open, setOpen] = useState<RowState>({});

  useHandleScreenResize(
    (screen) =>
      screen >= SCREEN_SM
        ? setOpen({
            earlyWithdraw: true,
            deposit: true,
            withdrawal: true,
            balance: true,
          })
        : setOpen({}),
    {
      debounceTime: 100,
      shouldAttachListener: true,
      shouldCallOnResizeOnLoad: true,
    }
  );

  function handleToggle(name: keyof Fees) {
    setOpen((open) => ({ ...open, [name]: !open[name] }));
  }

  return (
    <table
      className={`${classes} max-sm:grid outline outline-1 outline-prim rounded w-full`}
    >
      <TableSection
        type="thead"
        classes="max-sm:grid max-sm:grid-cols-[3rem_1fr_5.5rem] max-sm:border-b border-gray-l3 dark:border-bluegray bg-orange-l6 dark:bg-blue-d7"
        rowClass="max-sm:contents uppercase text-xs font-bold border-b border-gray-l3 dark:border-bluegray bg-orange-l6 dark:bg-blue-d7"
      >
        <Cells
          type="th"
          cellClass="px-4 py-4 border-r border-gray-l3 dark:border-bluegray last:border-r-0"
        >
          <th className="" />
          <th className="sm:hidden" />
          <th className="max-sm:col-start-3 max-sm:border-r-0">active</th>
          <th className="text-left max-sm:hidden">payout address</th>
          <th className="max-sm:hidden">fee rate (%)</th>
        </Cells>
      </TableSection>
      <TableSection
        classes="max-sm:contents"
        type="tbody"
        rowClass="max-sm:grid max-sm:grid-cols-[3rem_1fr_5.5rem] border-b border-gray-l3 dark:border-bluegray last:border-0 even:bg-orange-l6 even:dark:bg-blue-d7"
      >
        <Fee
          title="early widthdraw fee"
          name="earlyWithdraw"
          onToggle={handleToggle}
          isOpen={!!open.balance}
        />
        <Fee
          title="withdrawal fee"
          name="withdrawal"
          onToggle={handleToggle}
          isOpen={!!open.withdrawal}
        />
        <Fee
          title="deposit fee"
          name="deposit"
          onToggle={handleToggle}
          isOpen={!!open.deposit}
        />
        <Fee
          title="balance fee"
          name="balance"
          onToggle={handleToggle}
          isOpen={!!open.balance}
        />
      </TableSection>
    </table>
  );
}
