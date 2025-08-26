import { appRoutes } from "constants/routes";
import { format } from "date-fns";
import { humanize } from "helpers/decimal";
import type { ReactNode } from "react";
import { Link } from "react-router";
import type { Earning } from "types/referrals";

export interface Props {
  items: Earning[];
  onViewMore?: () => void;
  emptyEl?: ReactNode;
  classes?: string;
}
export function EarningsHistory({
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
            <th className="font-medium text-sm text-gray">NPO</th>
            <th className="font-medium text-sm text-gray">Amount</th>
            <th className="font-medium text-sm text-gray">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((payout, idx) => (
            <tr key={idx} className="text-sm text-gray-d4">
              <td>{format(payout.date, "PP")}</td>
              <td>
                <Link to={`${appRoutes.marketplace}/${payout.donation.to_id}`}>
                  {payout.donation.to_name}
                </Link>
              </td>

              <td>${humanize(payout.amount)}</td>
              <td>
                <div
                  className={`${payout.status === "pending" ? "bg-gray" : "bg-green"} text-white text-xs font-semibold px-2 py-0.5  rounded-sm inline-block`}
                >
                  {payout.status}
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
