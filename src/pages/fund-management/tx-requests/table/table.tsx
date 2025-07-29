import type { IBalanceTx } from "@better-giving/balance-txs";
import { format } from "date-fns";
import { humanize } from "helpers/decimal";

export interface Props {
  records: IBalanceTx[];
  classes?: string;
  onLoadMore?(): void;
  disabled: boolean;
  isLoading: boolean;
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
            <th className="font-medium text-sm text-gray">Requestor</th>
            <th className="font-medium text-sm text-gray">Units</th>
            <th className="font-medium text-sm text-gray">Price</th>
            <th className="font-medium text-sm text-gray">Value</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, idx) => (
            <tr key={idx} className="text-sm">
              <td>{format(r.date_created, "PP")}</td>
              <td>Redeem units</td>
              <td>{r.owner}</td>
              <td>{humanize(r.amount_units)}</td>
              <td>${humanize(r.amount / r.amount_units)}</td>
              <td>${humanize(r.amount)}</td>
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
