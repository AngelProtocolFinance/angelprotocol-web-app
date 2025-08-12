import type { ISettlement } from "@better-giving/payouts";
import { format } from "date-fns";
import { humanize } from "helpers/decimal";
import type { IPaginator } from "types/components";

export interface Props extends IPaginator<ISettlement> {}

export function Table({
  items,
  classes = "",
  disabled,
  loading,
  load_next,
}: Props) {
  return (
    <div className={`${classes} overflow-x-auto`}>
      <table className="min-w-full [&_th,&_td]:p-2 [&_th,&_td]:text-left [&_tbody]:divide-y [&_tbody]:divide-gray-l2 divide-y divide-gray-l2">
        <thead className="bg-blue-l5">
          <tr>
            <th className="font-medium text-sm text-gray">Date</th>
            <th className="font-medium text-sm text-gray">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((payout, idx) => (
            <tr key={idx} className="text-sm">
              <td>{format(payout.date, "PP")}</td>
              <td>${humanize(payout.amount)} </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          {load_next && (
            <tr>
              <td colSpan={3}>
                <button
                  disabled={disabled || loading}
                  onClick={load_next}
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
