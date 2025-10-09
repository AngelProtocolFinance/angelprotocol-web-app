import type { IDonationFinal } from "@better-giving/donation";
import { format } from "date-fns";
import { humanize } from "helpers/decimal";
import { Link, href } from "react-router";
import type { IPaginator } from "types/components";

export interface Props extends IPaginator<IDonationFinal> {}
export function EarningsHistory({ items, classes = "", load_next }: Props) {
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
          {items.map((p, idx) => {
            const amount =
              (p.referrer_commission?.from_fee ?? 0) +
              (p.referrer_commission?.from_tip ?? 0);

            const status: "pending" | "paid" = p.referrer_commission
              ?.transfer_id
              ? "paid"
              : "pending";
            return (
              <tr key={idx} className="text-sm text-gray-d4">
                <td>
                  {p.transactionDate ? format(p.transactionDate, "PP") : ""}
                </td>
                <td>
                  <Link
                    to={href("/marketplace/:id", {
                      id: (p.endowmentId ?? 0).toString(),
                    })}
                  >
                    {p.charityName}
                  </Link>
                </td>

                <td>${humanize(amount)}</td>
                <td>
                  <div
                    className={`${status === "pending" ? "bg-gray" : "bg-green"} text-white text-xs font-semibold px-2 py-0.5  rounded-sm inline-block`}
                  >
                    {status}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {load_next && (
            <tr>
              <td colSpan={3}>
                <button
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
