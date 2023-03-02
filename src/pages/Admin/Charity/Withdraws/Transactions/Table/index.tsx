import { TableProps } from "../types";
import TableSection, { Cells } from "components/TableSection";
import LoadMoreBtn from "../LoadMoreBtn";
import LogRow from "./LogRow";

export default function Table({
  withdraws,
  classes = "",
  disabled,
  isLoading,
  hasMore,
  onLoadMore,
}: TableProps) {
  return (
    <table
      className={`${classes} w-full text-sm rounded border border-separate border-spacing-0 border-prim`}
    >
      <TableSection
        type="thead"
        rowClass="bg-orange-l6 dark:bg-blue-d7 divide-x divide-prim"
      >
        <Cells
          type="th"
          cellClass="px-3 py-4 text-xs uppercase font-semibold text-left first:rounded-tl last:rounded-tr"
        >
          <>Start time</>
          <>Amount</>
          <>Network</>
          <>Withdrawal address/Account</>
          <>Blockchain record</>
          <>Status</>
          <>Actions</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="even:bg-orange-l6 dark:odd:bg-blue-d6 dark:even:bg-blue-d7 divide-x divide-prim"
      >
        {withdraws
          .map((log, i) => (
            <LogRow {...log} key={i} areBotEdgesFlat={hasMore} />
          ))
          .concat(
            hasMore ? (
              <td
                colSpan={9}
                key="load-more-btn"
                className="border-t border-prim rounded-b"
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
