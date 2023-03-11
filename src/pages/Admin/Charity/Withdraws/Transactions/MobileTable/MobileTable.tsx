import { TableProps } from "../types";
import { HeaderButton } from "components/HeaderButton";
import useSort from "hooks/useSort";
import LoadMoreBtn from "../LoadMoreBtn";
import TableRow from "./TableRow";

export default function MobileTable({
  withdraws,
  classes = "",
  isLoading,
  hasMore,
  onLoadMore,
}: TableProps) {
  const { handleHeaderClick, sorted, sortDirection, sortKey } = useSort(
    withdraws,
    "start_time"
  );

  return (
    <div
      className={`${classes} w-full @max-md:max-w-lg border border-prim ${
        hasMore ? "rounded-t" : "rounded"
      }`}
    >
      <div className="grid grid-cols-6 h-10 uppercase text-xs font-bold bg-orange-l6 dark:bg-blue-d7 border-b border-prim divide-x divide-prim rounded-t">
        <div />
        <div className="py-3 px-4 col-span-3">
          <HeaderButton
            onClick={handleHeaderClick("start_time")}
            _activeSortKey={sortKey}
            _sortKey="start_time"
            _sortDirection={sortDirection}
          >
            Start time
          </HeaderButton>
        </div>
        <div className="py-3 px-4 col-span-2 text-center">
          <HeaderButton
            onClick={handleHeaderClick("amount")}
            _activeSortKey={sortKey}
            _sortKey="amount"
            _sortDirection={sortDirection}
          >
            Amount
          </HeaderButton>
        </div>
      </div>

      {sorted.map((row) => (
        <TableRow
          key={`table-row-${row.proposal_id}`}
          log={row}
          isLastBotBorderFlat={hasMore}
        />
      ))}
      {hasMore && (
        <LoadMoreBtn
          onClick={onLoadMore}
          disabled={isLoading}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
