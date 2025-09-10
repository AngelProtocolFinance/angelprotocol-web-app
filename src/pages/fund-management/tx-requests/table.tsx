import type { IBalanceTx } from "@better-giving/balance-txs";
import { NavLink } from "@remix-run/react";
import { format } from "date-fns";
import { humanize } from "helpers/decimal";
import type { IPaginator } from "types/components";

export interface Props extends IPaginator<IBalanceTx> {}

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
            <th className="font-medium text-sm text-gray">Description</th>
            <th className="font-medium text-sm text-gray">Requestor</th>
            <th className="font-medium text-sm text-gray">Units</th>
            <th className="font-medium text-sm text-gray">Price</th>
            <th className="font-medium text-sm text-gray">Value</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((r, idx) => (
            <tr key={idx} className="text-sm">
              <td>{format(r.date_created, "PP")}</td>
              <td>Redeem units</td>
              <td>{r.owner}</td>
              <td>{humanize(r.amount_units)}</td>
              <td>${humanize(r.amount / r.amount_units)}</td>
              <td>${humanize(r.amount)}</td>
              <td>
                {r.status === "pending" ? (
                  <div className="flex items-center gap-x-2">
                    <NavLink
                      to={`${r.id}/approve`}
                      className="btn-green text-xs uppercase font-bold px-2 py-1 rounded-xs"
                    >
                      Approve
                    </NavLink>
                    <NavLink
                      to={`${r.id}/reject`}
                      className="btn-red text-xs uppercase font-bold px-2 py-1 rounded-xs"
                    >
                      Reject
                    </NavLink>
                  </div>
                ) : r.status === "cancelled" ? (
                  <span className="text-red">Cancelled</span>
                ) : (
                  <span className="text-green">Final</span>
                )}
              </td>
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
