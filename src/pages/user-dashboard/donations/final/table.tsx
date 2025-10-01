import { Cells, TableSection } from "components/table-section";
import { app_routes } from "constants/routes";
import { toPP } from "helpers/date";
import { centsDecimals, humanize, round_to_cents } from "helpers/decimal";
import { ArrowDownToLine } from "lucide-react";
import { Link } from "react-router";
import type { IPaginator } from "types/components";
import { LoadMoreBtn } from "../load-more-btn";
import type { IRow } from "./helpers";

interface Props extends IPaginator<IRow> {}

export function Table({
  items,
  classes = "",
  disabled,
  loading,
  load_next,
}: Props) {
  return (
    <table
      className={`${classes} w-full text-sm rounded-sm border border-separate border-spacing-0 border-gray-l3`}
    >
      <TableSection type="thead" rowClass="bg-blue-l4 divide-x divide-gray-l3">
        <Cells
          type="th"
          cellClass="px-3 py-4 text-xs uppercase font-semibold text-left first:rounded-tl last:rounded-tr"
        >
          <>Date</>
          <>Recipient</>
          <>Amount</>
          <>Method</>
          <>Receipt</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="even:bg-blue-l5 divide-x divide-gray-l3"
        selectedClass="bg-blue-l4 dark:bg-blue-d4"
      >
        {items
          .map((row) => (
            <Cells
              key={row.id}
              type="td"
              cellClass={`p-3 border-t border-gray-l3 max-w-[256px] truncate ${
                load_next ? "" : "first:rounded-bl last:rounded-br"
              }`}
            >
              <>{toPP(row.date)}</>
              <div>
                <Link
                  to={`${app_routes.marketplace}/${row.recipient_name}`}
                  className="flex items-center justify-between gap-1 text-blue hover:text-blue-d1"
                >
                  <span className="truncate max-w-[12rem]">
                    {row.recipient_name}
                  </span>
                </Link>
                {row.program_id && (
                  <Link
                    className="text-blue hover:text-blue-d1"
                    to={`${app_routes.profile}/${row.recipient_id}/program/${row.program_id}`}
                  >
                    {row.program_name}
                  </Link>
                )}
              </div>
              <div>
                {row.currency}{" "}
                {round_to_cents(row.amount, centsDecimals(row.usd_value))}{" "}
                <span className="text-gray text-sm">
                  {row.currency !== "USD"
                    ? `$${humanize(row.usd_value)}`
                    : null}
                </span>
                <p className="text-2xs text-gray-d1 uppercase">
                  {row.frequency}
                </p>
              </div>
              <span className="capitalize">{row.payment_method}</span>
              <Link to={row.id} className="w-full flex justify-center">
                <ArrowDownToLine size={20} />
              </Link>
            </Cells>
          ))
          .concat(
            load_next ? (
              <td
                colSpan={9}
                key="load-more-btn"
                className="border-t border-gray-l3 rounded-b"
              >
                <LoadMoreBtn
                  onLoadMore={load_next}
                  disabled={disabled}
                  isLoading={loading}
                />
              </td>
            ) : (
              []
            )
          )}
      </TableSection>
    </table>
  );
}
