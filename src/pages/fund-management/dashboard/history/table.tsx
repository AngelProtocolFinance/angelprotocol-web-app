import type { IBalanceTx } from "@better-giving/balance-txs";
import type { ILog } from "@better-giving/nav-history";
import { format } from "date-fns";
import { humanize } from "helpers/decimal";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export interface Props {
  records: ILog[];
  classes?: string;
  onLoadMore?(): void;
  disabled: boolean;
  isLoading: boolean;
}

export function FlowIcon(this_account: string, data: IBalanceTx): ReactNode {
  if (data.account === this_account) {
    return <ArrowRight size={16} className="text-green" />;
  }
}

export function Table({
  records,
  classes = "",
  disabled,
  isLoading,
  onLoadMore,
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
          {records.map((r, idx) => (
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
