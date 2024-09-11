import TableSection, { Cells } from "components/TableSection";
import { humanize } from "helpers";
import LoadMoreBtn from "./LoadMoreBtn";
import type { TableProps } from "./types";

export default function Table({
  records,
  classes = "",
  disabled,
  isLoading,
  hasMore,
  onLoadMore,
}: TableProps) {
  return (
    <table
      className={`${classes} w-full text-sm rounded border border-separate border-spacing-0 border-gray-l4`}
    >
      <TableSection type="thead" rowClass="divide-x divide-gray-l4">
        <Cells
          type="th"
          cellClass="px-3 py-2 bg-gray-l5 text-xs uppercase font-semibold text-left first:rounded-tl last:rounded-tr"
        >
          <>Date</>
          <>Type</>
          <>From</>
          <>Amount</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="even:bg-blue-l5 dark:odd:bg-blue-d6 dark:even:bg-blue-d7 divide-x divide-gray-l4"
        selectedClass="bg-blue-l4 dark:bg-blue-d4"
      >
        {records
          .map((row) => (
            <Cells
              key={row.date}
              type="td"
              cellClass={`p-3 border-t border-gray-l4 max-w-[256px] truncate ${
                hasMore ? "" : "first:rounded-bl last:rounded-br"
              }`}
            >
              <>{new Date(row.date).toLocaleDateString()}</>
              <>{row.to}</>
              <>{row.from}</>
              <>$ {humanize(row.amount)}</>
            </Cells>
          ))
          .concat(
            hasMore ? (
              <td
                colSpan={9}
                key="load-more-btn"
                className="border-t border-gray-l4 rounded-b"
              >
                <LoadMoreBtn
                  onLoadMore={onLoadMore}
                  disabled={disabled}
                  isLoading={isLoading}
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
