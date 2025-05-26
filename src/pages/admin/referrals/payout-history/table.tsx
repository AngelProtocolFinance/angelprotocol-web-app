import type { Payout } from "@better-giving/referrals/interface";
import { Arrow, Content, Tooltip } from "components/tooltip";
import { format } from "date-fns";
import { humanize } from "helpers/decimal";
import { Info } from "lucide-react";
import type { ReactNode } from "react";

export interface Props {
  items: Payout[];
  onViewMore?: () => void;
  emptyEl?: ReactNode;
  classes?: string;
}
export function Table({
  items,
  classes = "",
  onViewMore,
  emptyEl = null,
}: Props) {
  if (items.length === 0) return emptyEl;
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
          {items.map((payout, idx) => (
            <tr
              key={idx}
              className={`text-sm ${payout.error ? "text-red" : "text-gray-d4"}`}
            >
              <td>{format(payout.date, "PP")}</td>
              <td>
                <div className="relative">
                  {payout.error && (
                    <Tooltip
                      tip={
                        <Content className="max-w-xs bg-gray-d4 p-4 text-gray-l4 text-xs shadow-lg rounded-lg">
                          <Arrow />
                          Commission amount not paid out and will be retried in
                          the next cycle.
                        </Content>
                      }
                    >
                      <Info size={16} className="absolute -left-5 top-0.5" />
                    </Tooltip>
                  )}
                  ${humanize(payout.amount, 3)}{" "}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          {onViewMore && (
            <tr>
              <td colSpan={3}>
                <button
                  onClick={onViewMore}
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
