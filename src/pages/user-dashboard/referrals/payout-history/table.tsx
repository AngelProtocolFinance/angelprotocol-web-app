import type { Payout } from "@better-giving/referrals/interface";
import { format } from "date-fns";
import { humanize } from "helpers/decimal";
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
            <th className="font-medium text-sm text-gray">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((payout, idx) => (
            <tr
              key={idx}
              className={`text-sm ${payout.error ? "text-red" : "text-gray-d4"}`}
            >
              <td>{format(payout.date, "PP")}</td>
              <td>${humanize(payout.amount, 3)}</td>
              <td>
                {payout.error ? <p className="">{payout.error}</p> : null}
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
