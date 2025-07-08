import { HeaderButton } from "components/header-button";
import TableSection, { Cells } from "components/table-section";
import useSort from "hooks/use-sort";
import type { Donation } from "types/donations";
import Row from "./row";

type Props = {
  donations: Donation.Item[];
  classes?: string;
  onLoadMore?(): void;
  disabled: boolean;
  isLoading: boolean;
};

export default function Table({
  donations,
  onLoadMore,
  isLoading,
  disabled,
}: Props) {
  const { handleHeaderClick, sorted, sortDirection, sortKey } = useSort(
    donations,
    "date"
  );

  return (
    <table className="w-full text-sm rounded-sm border border-separate border-spacing-0 border-gray-l3">
      <TableSection
        type="thead"
        rowClass="bg-blue-l4 dark:bg-blue-d7 divide-x divide-gray-l3"
      >
        <Cells
          type="th"
          cellClass="px-3 py-4 text-xs uppercase font-semibold text-left first:rounded-tl last:rounded-tr"
        >
          <>ID</>
          <HeaderButton
            onClick={handleHeaderClick("date")}
            _activeSortKey={sortKey}
            _sortKey="date"
            _sortDirection={sortDirection}
          >
            Date
          </HeaderButton>
          <>Program</>
          <HeaderButton
            onClick={handleHeaderClick("app_used")}
            _activeSortKey={sortKey}
            _sortKey="appUsed"
            _sortDirection={sortDirection}
          >
            Origin
          </HeaderButton>
          <HeaderButton
            onClick={handleHeaderClick("payment_method")}
            _activeSortKey={sortKey}
            _sortKey="paymentMethod"
            _sortDirection={sortDirection}
          >
            Method
          </HeaderButton>
          <HeaderButton
            onClick={handleHeaderClick("final_amount_usd")}
            _activeSortKey={sortKey}
            _sortKey="finalAmountUsd"
            _sortDirection={sortDirection}
          >
            Amount
          </HeaderButton>
          <>Donor</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="even:bg-blue-l5 dark:odd:bg-blue-d6 dark:even:bg-blue-d7 divide-x divide-blue-l2"
        selectedClass="bg-blue-l4 dark:bg-blue-d4"
      >
        {sorted
          .map((record) => (
            <Row
              key={record.id}
              {...record}
              classes={onLoadMore ? "" : "first:rounded-bl last:rounded-br"}
            />
          ))
          .concat(
            onLoadMore ? (
              <td
                colSpan={19}
                key="load-more-btn"
                className="border-t border-gray-l3 rounded-b"
              >
                <button
                  type="button"
                  onClick={onLoadMore}
                  disabled={disabled}
                  className="flex items-center justify-center gap-3 uppercase text-sm font-bold rounded-b w-full h-12 enabled:hover:bg-blue-l4 dark:enabled:hover:bg-blue-d3 active:bg-blue-l4 dark:active:bg-blue-d2 disabled:bg-gray-l3 disabled:text-gray aria-disabled:bg-gray-l3 dark:aria-disabled:bg-gray-d1 dark:disabled:bg-gray-d1"
                >
                  {isLoading ? "Loading..." : "Load More"}
                </button>
              </td>
            ) : (
              []
            )
          )}
      </TableSection>
    </table>
  );
}
