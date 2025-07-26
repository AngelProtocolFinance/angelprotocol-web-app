import type { IPayout } from "@better-giving/payouts";
import { Arrow, Content, Tooltip } from "components/tooltip";
import { format } from "date-fns";
import { humanize } from "helpers/decimal";
import { mask_string } from "helpers/mask-string";
import { InfoIcon } from "lucide-react";

export interface IPayoutsTable {
  records: IPayout[];
  classes?: string;
  onLoadMore?(): void;
  disabled: boolean;
  isLoading: boolean;
}

export function PayoutsTable({
  records,
  classes = "",
  disabled,
  isLoading,
  onLoadMore,
}: IPayoutsTable) {
  return (
    <div className={`${classes} overflow-x-auto`}>
      <table className="min-w-full [&_th,&_td]:p-2 [&_th,&_td]:text-left [&_tbody]:divide-y [&_tbody]:divide-gray-l2 divide-y divide-gray-l2">
        <thead className="bg-blue-l5">
          <tr>
            <th className="font-medium text-sm text-gray">Date</th>
            <th className="font-medium text-sm text-gray">Amount</th>
            <th className="font-medium text-sm text-gray">Description</th>
            <th className="font-medium text-sm text-gray">Status</th>
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
              <td>
                {payout.source}:{" "}
                <span className="text-xs text-gray-d1">
                  {mask_string(payout.source_id, 4)}
                </span>
              </td>
              <td className="uppercase text-xs">
                {payout.type === "error" ? (
                  <span className="text-red">Error</span>
                ) : payout.type === "pending" ? (
                  <span className="text-amber">Pending</span>
                ) : (
                  <span className="text-green">Paid</span>
                )}
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
