import ExtLink from "components/ExtLink";
import { HeaderButton } from "components/HeaderButton";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import { getTxUrl, humanize, maskAddress } from "helpers";
import useSort from "hooks/useSort";
import { DonationReceivedByEndow } from "types/aws";

type Props = {
  donations: DonationReceivedByEndow[];
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
    <table className="w-full text-sm rounded border border-separate border-spacing-0 border-prim">
      <TableSection
        type="thead"
        rowClass="bg-orange-l6 dark:bg-blue-d7 divide-x divide-prim"
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
          <HeaderButton
            onClick={handleHeaderClick("symbol")}
            _activeSortKey={sortKey}
            _sortKey="symbol"
            _sortDirection={sortDirection}
          >
            Currency
          </HeaderButton>
          <HeaderButton
            onClick={handleHeaderClick("amount")}
            _activeSortKey={sortKey}
            _sortKey="amount"
            _sortDirection={sortDirection}
          >
            Total Amount
          </HeaderButton>
          <>Current Portion</>
          <>Sustainability Portion</>
          <>Transaction</>
          <>Receipt provided</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="even:bg-orange-l6 dark:odd:bg-blue-d6 dark:even:bg-blue-d7 divide-x divide-prim"
        selectedClass="bg-orange-l5 dark:bg-blue-d4"
      >
        {sorted
          .map(
            ({
              hash,
              amount,
              symbol,
              chainId,
              date,
              kycData,
              splitLiq = "50",
            }) => (
              <Cells
                key={hash}
                type="td"
                cellClass={`p-3 border-t border-prim max-w-[256px] truncate ${
                  hasMore ? "" : "first:rounded-bl last:rounded-br"
                }`}
              >
                <span className="text-sm">
                  {new Date(date).toLocaleDateString()}
                </span>
                <span className="text-sm">{symbol}</span>
                <>{humanize(amount, 3)}</>
                <>{humanize(amount * (+splitLiq / 100), 3)}</>
                <>{humanize(amount * ((100 - +splitLiq) / 100), 3)}</>

                {chainId === "staging" || chainId === "fiat" ? (
                  <>- - -</>
                ) : (
                  <ExtLink
                    //default to ethereum for staging
                    href={getTxUrl(chainId, hash)}
                    className="text-center text-blue hover:text-blue-l2 cursor-pointer uppercase text-sm"
                  >
                    {maskAddress(hash)}
                  </ExtLink>
                )}

                <td className="relative">
                  {!kycData ? (
                    <Icon
                      type="Close"
                      //prevent icon size from affecting row height
                      className="left-4 absolute top-1/2 -translate-y-1/2 text-red "
                      size={22}
                    />
                  ) : (
                    <Icon
                      type="CheckCircle"
                      className="left-4 absolute top-1/2 -translate-y-1/2  text-green"
                      size={20}
                    />
                  )}
                </td>
              </Cells>
            )
          )
          .concat(
            hasMore ? (
              <td
                colSpan={9}
                key="load-more-btn"
                className="border-t border-prim rounded-b"
              >
                <button
                  type="button"
                  onClick={onLoadMore}
                  disabled={disabled}
                  className="flex items-center justify-center gap-3 uppercase text-sm font-bold rounded-b w-full h-12 enabled:hover:bg-orange-l5 enabled:dark:hover:bg-blue-d3 active:bg-orange-l4 dark:active:bg-blue-d2 disabled:bg-gray-l3 disabled:text-gray aria-disabled:bg-gray-l3 aria-disabled:dark:bg-bluegray disabled:dark:bg-bluegray"
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
