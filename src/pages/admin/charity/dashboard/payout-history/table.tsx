import TableSection, { Cells } from "components/table-section";
import { Arrow, Content, Tooltip } from "components/tooltip";
import { humanize } from "helpers";
import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  CircleAlert,
} from "lucide-react";
import type { ReactNode } from "react";
import type { BalanceTx } from "types/aws";
import { MIN_GRANT_PROCESSING } from "../common";
import LoadMoreBtn from "./load-more-btn";
import type { TableProps } from "./types";

const transferIcon = <ArrowLeftRight className="size-4 text-amber" />;
const unprocessedIcon = <CircleAlert className="size-4 text-gray" />;
const receivedIcon = <ArrowRight className="size-4 text-green" />;
const withdrawIcon = <ArrowLeft className="size-4 text-gray" />;

const txs: {
  [K in `${BalanceTx["from"]}-${BalanceTx["to"]}`]: (amount: number) => {
    description: string;
    icon: ReactNode;
  };
} = {
  "donation-cash": () => ({
    description: "Donation paid out",
    icon: withdrawIcon,
  }),
  "donation-liq": () => ({
    description: "Donation transferred to Savings",
    icon: receivedIcon,
  }),
  "donation-lock": () => ({
    description: "Donation transferred to Investments",
    icon: receivedIcon,
  }),
  "donation-unprocessed": (amnt) => ({
    description: "Unprocessed donation",
    icon: (
      <Tooltip
        tip={
          <Content className="max-w-xs text-center bg-navy-d4 p-4 text-gray-l4 text-xs shadow-lg rounded-lg">
            <Arrow />${humanize(amnt)} does not meet the ${MIN_GRANT_PROCESSING}{" "}
            Grant processing threshold and would be processed in the next cycle
          </Content>
        }
      >
        {unprocessedIcon}
      </Tooltip>
    ),
  }),
  "liq-cash": () => ({
    description: "Withdrawal from Savings",
    icon: withdrawIcon,
  }),
  "lock-cash": () => ({
    description: "Withdrawal from Investments",
    icon: withdrawIcon,
  }),
  "liq-lock": () => ({
    description: "Transfer from Savings to Investments",
    icon: transferIcon,
  }),
  "lock-liq": () => ({
    description: "Transfer from Investments to Savings",
    icon: transferIcon,
  }),
  "liq-liq": () => ({ description: "--", icon: null }),
  "lock-lock": () => ({ description: "--", icon: null }),
  "liq-unprocessed": (amnt) => ({
    description: "Unprocessed withdrawal from Savings",
    icon: (
      <Tooltip
        tip={
          <Content className="max-w-xs text-center bg-navy-d4 p-4 text-gray-l4 text-xs shadow-lg rounded-lg">
            <Arrow />${humanize(amnt)} does not meet the ${MIN_GRANT_PROCESSING}{" "}
            Grant processing threshold and is credited back to Savings
          </Content>
        }
      >
        {unprocessedIcon}
      </Tooltip>
    ),
  }),
  "lock-unprocessed": (amnt) => ({
    description: "Unprocessed withdrawal from Investments",
    icon: (
      <Tooltip
        tip={
          <Content className="max-w-xs text-center bg-navy-d4 p-4 text-gray-l4 text-xs shadow-lg rounded-lg">
            <Arrow />${humanize(amnt)} does not meet the ${MIN_GRANT_PROCESSING}{" "}
            Grant processing threshold and is credited back to Investments
          </Content>
        }
      >
        {unprocessedIcon}
      </Tooltip>
    ),
  }),
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
      className={`${classes} w-full text-sm rounded-sm border border-separate border-spacing-0 border-gray-l4`}
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
                <td className="w-4">{tx(row.amount).icon}</td>
                <>{new Date(row.date).toLocaleDateString()}</>
                <>{tx(row.amount).description}</>
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
