import { TableProps } from "../types";
import { HeaderButton } from "components/HeaderButton";
import TableSection, { Cells } from "components/TableSection";
import useSort from "hooks/useSort";
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
  const { handleHeaderClick, sorted, sortDirection, sortKey } = useSort(
    withdraws,
    "start_time"
  );

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
          cellClass="px-3 py-4 text-xs uppercase font-semibold first:rounded-tl last:rounded-tr"
        >
          <HeaderButton
            onClick={handleHeaderClick("start_time")}
            _activeSortKey={sortKey}
            _sortKey="start_time"
            _sortDirection={sortDirection}
          >
            Start time
          </HeaderButton>
          <HeaderButton
            onClick={handleHeaderClick("amount")}
            _activeSortKey={sortKey}
            _sortKey="amount"
            _sortDirection={sortDirection}
          >
            Amount
          </HeaderButton>
          <HeaderButton
            onClick={handleHeaderClick("target_chain")}
            _activeSortKey={sortKey}
            _sortKey="target_chain"
            _sortDirection={sortDirection}
          >
            Network
          </HeaderButton>
          <HeaderButton
            onClick={handleHeaderClick("target_wallet")}
            _activeSortKey={sortKey}
            _sortKey="target_wallet"
            _sortDirection={sortDirection}
          >
            Withdrawal address/Account
          </HeaderButton>
          <>Blockchain record</>
          <HeaderButton
            onClick={handleHeaderClick("proposal_status")}
            _activeSortKey={sortKey}
            _sortKey="proposal_status"
            _sortDirection={sortDirection}
          >
            Status
          </HeaderButton>
          <>Actions</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="even:bg-orange-l6 dark:odd:bg-blue-d6 dark:even:bg-blue-d7 divide-x divide-prim"
      >
        {sorted
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
