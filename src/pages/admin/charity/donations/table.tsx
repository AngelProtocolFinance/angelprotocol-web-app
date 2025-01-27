import { HeaderButton } from "components/header-button";
import TableSection, { Cells } from "components/table-section";
import useSort from "hooks/use-sort";
import type { Donation } from "types/aws";
import Row from "./row";

type Props = {
  donations: Donation.Record[];
  classes?: string;
  onLoadMore(): void;
  hasMore: boolean;
  disabled: boolean;
  isLoading: boolean;
};

export default function Table({
  donations,
  hasMore,
  onLoadMore,
  isLoading,
  disabled,
}: Props) {
  const { handleHeaderClick, sorted, sortDirection, sortKey } = useSort(
    donations,
    "date"
  );

  return (
    <table className="w-full text-sm rounded-sm border border-separate border-spacing-0 border-blue-l2">
      <TableSection
        type="thead"
        rowClass="bg-blue-l4 dark:bg-blue-d7 divide-x divide-blue-l2"
      >
        <Cells
          type="th"
          cellClass="px-3 py-4 text-xs uppercase font-semibold text-left first:rounded-tl last:rounded-tr"
        >
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
            onClick={handleHeaderClick("appUsed")}
            _activeSortKey={sortKey}
            _sortKey="appUsed"
            _sortDirection={sortDirection}
          >
            Donation Origin
          </HeaderButton>
          <HeaderButton
            onClick={handleHeaderClick("paymentMethod")}
            _activeSortKey={sortKey}
            _sortKey="paymentMethod"
            _sortDirection={sortDirection}
          >
            Donation Type
          </HeaderButton>
          <HeaderButton
            onClick={handleHeaderClick("isRecurring")}
            _activeSortKey={sortKey}
            _sortKey="isRecurring"
            _sortDirection={sortDirection}
          >
            Recurring Donation
          </HeaderButton>
          <HeaderButton
            onClick={handleHeaderClick("symbol")}
            _activeSortKey={sortKey}
            _sortKey="symbol"
            _sortDirection={sortDirection}
          >
            Donation Asset
          </HeaderButton>
          <>Donation Amount</>
          <HeaderButton
            onClick={handleHeaderClick("finalAmountUsd")}
            _activeSortKey={sortKey}
            _sortKey="finalAmountUsd"
            _sortDirection={sortDirection}
          >
            Donation Value USD
          </HeaderButton>
          <>Transaction Hash</>
          <>Receipt Provided</>
          <>Full Name</>
          <>Email</>
          <>Address Line 1</>
          <>Address Line 2</>
          <>City</>
          <>State</>
          <>Zip Code</>
          <>Country</>
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
              classes={hasMore ? "" : "first:rounded-bl last:rounded-br"}
            />
          ))
          .concat(
            hasMore ? (
              <td
                colSpan={19}
                key="load-more-btn"
                className="border-t border-blue-l2 rounded-b"
              >
                <button
                  type="button"
                  onClick={onLoadMore}
                  disabled={disabled}
                  className="flex items-center justify-center gap-3 uppercase text-sm font-bold rounded-b w-full h-12 enabled:hover:bg-blue-l4 dark:enabled:hover:bg-blue-d3 active:bg-blue-l4 dark:active:bg-blue-d2 disabled:bg-gray-l3 disabled:text-navy-l2 aria-disabled:bg-gray-l3 dark:aria-disabled:bg-navy dark:disabled:bg-navy"
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
