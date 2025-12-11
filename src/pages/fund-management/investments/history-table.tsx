import { format } from "date-fns";
import { humanize } from "helpers/decimal";
import type { IBalanceTx } from "lib/balance-txs";
import type { ILog } from "lib/nav";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import type { IPaginator } from "types/components";

export interface Props extends IPaginator<ILog> {}

export function FlowIcon(this_account: string, data: IBalanceTx): ReactNode {
  if (data.account === this_account) {
    return <ArrowRight size={16} className="text-green" />;
  }
}

export function HistoryTable({
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
            <th className="font-medium text-sm text-gray">Description</th>
            <th className="font-medium text-sm text-gray">Value</th>
            <th className="font-medium text-sm text-gray">Units</th>
            <th className="font-medium text-sm text-gray">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r, idx) => (
            <tr key={idx} className="text-sm">
              <td>{format(r.date, "PP")}</td>
              <td>{r.reason}</td>
              <td>${humanize(r.value)}</td>
              <td>{humanize(r.units)}</td>
              <td>${humanize(r.price)}</td>
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
