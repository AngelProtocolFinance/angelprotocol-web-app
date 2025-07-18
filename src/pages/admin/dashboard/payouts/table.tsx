import { Arrow, Content, Tooltip } from "components/tooltip";
import { format } from "date-fns";
import { humanize } from "helpers/decimal";
import { InfoIcon } from "lucide-react";
import type { TableProps } from "./types";

export function Table({
  records,
  classes = "",
  disabled,
  isLoading,
  onLoadMore,
}: TableProps) {
  return (
    <div className={`${classes} overflow-x-auto`}>
      <table className="min-w-full [&_th,&_td]:p-2 [&_th,&_td]:first:pl-0 [&_th,&_td]:text-left [&_tbody]:divide-y [&_tbody]:divide-gray-l2 divide-y divide-gray-l2">
        <thead>
          <tr>
            <th className="font-medium text-sm text-gray">Date</th>
            <th className="font-medium text-sm text-gray">Amount</th>
          </tr>
        </thead>
        <tbody>
          {records.map((payout, idx) => (
            <tr
              key={idx}
              className={`text-sm ${payout.type === "error" ? "text-red" : "text-gray-d4"}`}
            >
              <td>{format(payout.date, "PP")}</td>
              <td>
                <div className="relative">
                  {payout.type === "error" && (
                    <Tooltip
                      tip={
                        <Content className="max-w-xs bg-gray-d4 p-4 text-gray-l4 text-xs shadow-lg rounded-lg">
                          <Arrow />
                          Commission amount not paid out and will be retried in
                          the next cycle.
                        </Content>
                      }
                    >
                      <InfoIcon
                        size={16}
                        className="absolute -left-5 top-0.5"
                      />
                    </Tooltip>
                  )}
                  ${humanize(payout.amount)}{" "}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          {onLoadMore && (
            <tr>
              <td colSpan={3}>
                <button
                  disabled={disabled || isLoading}
                  onClick={onLoadMore}
                  type="button"
                  className="text-sm text-blue hover:text-blue-d1"
                >
                  view more
                </button>
              </td>
            </tr>
          )}
        </tfoot>
      </table>
    </div>
  );
}
