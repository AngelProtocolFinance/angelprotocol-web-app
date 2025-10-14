import type { IPayout } from "@better-giving/payouts";
import { Arrow, Content, Tooltip } from "components/tooltip";
import { format } from "date-fns";
import { humanize } from "helpers/decimal";
import { ArrowRightIcon, InfoIcon } from "lucide-react";
import type { IPaginator } from "types/components";
import { desc } from "./desc";

export interface IPayoutsTable extends IPaginator<IPayout> {}

export function PayoutsTable({
  items,
  classes = "",
  disabled,
  loading,
  load_next,
}: IPayoutsTable) {
  return (
    <div className={`${classes} overflow-x-auto`}>
      <table className="min-w-full [&_th,&_td]:p-2 [&_th,&_td]:text-left [&_tbody]:divide-y [&_tbody]:divide-gray-l2 divide-y divide-gray-l2">
        <thead className="bg-blue-l5">
          <tr>
            <th />
            <th className=" text-sm text-gray">Amount</th>
            <th className=" text-sm text-gray">From</th>
            <th className=" text-sm text-gray">Date</th>
            <th className=" text-sm text-gray">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((payout, idx) => (
            <tr
              key={idx}
              className={`text-sm ${payout.type === "error" ? "text-red" : "text-gray-d4"}`}
            >
              <td className="w-8">
                <ArrowRightIcon size={14} className="inline stroke-green" />
              </td>
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
              </td>{" "}
              <td>{desc(payout)}</td>
              <td>{format(payout.date, "PP")}</td>
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
