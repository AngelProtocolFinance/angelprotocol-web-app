import type { IBalanceTx } from "@better-giving/balance-txs";
import { Arrow, Content, Tooltip } from "components/tooltip";
import { format } from "date-fns";
import { humanize } from "helpers/decimal";
import { ArrowRight, InfoIcon } from "lucide-react";
import type { ReactNode } from "react";
import { row_meta } from "./row-meta";

export interface Props {
  records: IBalanceTx[];
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
            <th /> {/** icons */}
            <th className="font-medium text-sm text-gray">Date</th>
            <th className="font-medium text-sm text-gray">Amount</th>
            <th className="font-medium text-sm text-gray">Description</th>
            <th className="font-medium text-sm text-gray">Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, idx) => (
            <tr key={idx} className="text-sm">
              <td>{row_meta(r).icon}</td>
              <td>{format(r.date_updated, "PP")}</td>
              <td>
                <div className="relative">
                  {r.status === "cancelled" && (
                    <Tooltip
                      tip={
                        <Content className="max-w-xs bg-gray-d4 p-4 text-gray-l4 text-xs shadow-lg rounded-lg">
                          <Arrow />
                          Transaction request was cancelled and will not be
                          processed.
                        </Content>
                      }
                    >
                      <InfoIcon
                        size={16}
                        className="absolute -left-5 top-0.5"
                      />
                    </Tooltip>
                  )}
                  ${humanize(r.amount)}{" "}
                </div>
              </td>
              <td>{row_meta(r).description}</td>
              <td className="uppercase text-xs">
                {r.status === "cancelled" ? (
                  <span className="text-red">Cancelled</span>
                ) : r.status === "pending" ? (
                  <span className="text-amber">Pending</span>
                ) : (
                  <span className="text-green">Final</span>
                )}
              </td>
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
