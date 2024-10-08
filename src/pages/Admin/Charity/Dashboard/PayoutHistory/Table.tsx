import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import { humanize } from "helpers";
import type { ReactNode } from "react";
import type { BalanceTx } from "types/aws";
import LoadMoreBtn from "./LoadMoreBtn";
import type { TableProps } from "./types";

const transferIcon = (
  <Icon type="ArrowLeftRight" className="size-4 text-amber" />
);
const unprocessedIcon = <Icon type="Info" className="size-4 text-gray" />;
const receivedIcon = <Icon type="ArrowRight" className="size-4 text-green" />;
const withdrawIcon = <Icon type="ArrowLeft" className="size-4 text-gray" />;

const txs: {
  [K in `${BalanceTx["from"]}-${BalanceTx["to"]}`]: {
    description: string;
    icon: ReactNode;
  };
} = {
  "donation-cash": { description: "Donation paid out", icon: withdrawIcon },
  "donation-liq": { description: "Donation saved", icon: receivedIcon },
  "donation-lock": { description: "Donation invested", icon: receivedIcon },
  "donation-unprocessed": {
    description: "Unprocessed donation",
    icon: unprocessedIcon,
  },
  "liq-cash": { description: "Withdrawal from savings", icon: withdrawIcon },
  "lock-cash": {
    description: "Withdrawal from investments",
    icon: withdrawIcon,
  },
  "liq-lock": {
    description: "Transfer from savings to investments",
    icon: transferIcon,
  },
  "lock-liq": {
    description: "Transfer from investments to savings",
    icon: transferIcon,
  },
  "liq-liq": { description: "--", icon: null },
  "lock-lock": { description: "--", icon: null },
  "liq-unprocessed": {
    description: "Unprocessed withdrawal from savings",
    icon: unprocessedIcon,
  },
  "lock-unprocessed": {
    description: "Unprocessed withdrawal from investments",
    icon: unprocessedIcon,
  },
};

export default function Table({
  records,
  classes = "",
  disabled,
  isLoading,
  hasMore,
  onLoadMore,
}: TableProps) {
  return (
    <table
      className={`${classes} w-full text-sm rounded border border-separate border-spacing-0 border-gray-l4`}
    >
      <TableSection type="thead" rowClass="divide-x divide-gray-l4">
        <Cells
          type="th"
          cellClass="px-3 py-2 bg-gray-l5 text-xs uppercase font-semibold text-left first:rounded-tl last:rounded-tr"
        >
          <>{/** icon */}</>
          <>Date</>
          <>Transaction</>
          <>Amount</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="even:bg-blue-l5 dark:odd:bg-blue-d6 dark:even:bg-blue-d7 divide-x divide-gray-l4"
        selectedClass="bg-blue-l4 dark:bg-blue-d4"
      >
        {records
          .map((row) => {
            const tx = txs[`${row.from}-${row.to}`];
            return (
              <Cells
                key={row.date}
                type="td"
                cellClass={`p-3 border-t border-gray-l4 max-w-[256px] truncate ${
                  hasMore ? "" : "first:rounded-bl last:rounded-br"
                }`}
              >
                <td className="w-4">{tx.icon}</td>
                <>{new Date(row.date).toLocaleDateString()}</>
                <>{tx.description}</>
                <>$ {humanize(row.amount)}</>
              </Cells>
            );
          })
          .concat(
            hasMore ? (
              <td
                colSpan={9}
                key="load-more-btn"
                className="border-t border-gray-l4 rounded-b"
              >
                <LoadMoreBtn
                  onLoadMore={onLoadMore}
                  disabled={disabled}
                  isLoading={isLoading}
                />
              </td>
            ) : (
              []
            )
          )}
      </TableSection>
    </table>
  );
}
