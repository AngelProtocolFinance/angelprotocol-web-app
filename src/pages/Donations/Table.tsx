import ExtLink from "components/ExtLink";
import { HeaderButton } from "components/HeaderButton";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import { chainIds } from "constants/chainIds";
import { appRoutes } from "constants/routes";
import { getTxUrl, humanize } from "helpers";
import useSort from "hooks/useSort";
import { Link } from "react-router-dom";
import LoadMoreBtn from "./LoadMoreBtn";
import { TableProps } from "./types";
import useShowKYCForm from "./useShowKYCForm";

export default function Table({
  donations,
  classes = "",
  disabled,
  isLoading,
  hasMore,
  onLoadMore,
}: TableProps) {
  const { handleHeaderClick, sorted, sortDirection, sortKey } = useSort(
    donations,
    "date"
  );

  const showKYCForm = useShowKYCForm();

  return (
    <table
      className={`${classes} w-full text-sm rounded border border-separate border-spacing-0 border-gray-l4`}
    >
      <TableSection
        type="thead"
        rowClass="bg-orange-l6 dark:bg-blue-d7 divide-x divide-prim"
      >
        <Cells
          type="th"
          cellClass="px-3 py-4 text-xs uppercase font-semibold text-left first:rounded-tl last:rounded-tr"
        >
          <HeaderButton
            onClick={handleHeaderClick("charityName")}
            _activeSortKey={sortKey}
            _sortKey="charityName"
            _sortDirection={sortDirection}
          >
            Recipient
          </HeaderButton>
          <HeaderButton
            onClick={handleHeaderClick("date")}
            _activeSortKey={sortKey}
            _sortKey="date"
            _sortDirection={sortDirection}
          >
            Date
          </HeaderButton>
          <HeaderButton
            onClick={handleHeaderClick("chainName")}
            _activeSortKey={sortKey}
            _sortKey="chainName"
            _sortDirection={sortDirection}
          >
            Network
          </HeaderButton>
          <>Currency</>
          <HeaderButton
            onClick={handleHeaderClick("amount")}
            _activeSortKey={sortKey}
            _sortKey="amount"
            _sortDirection={sortDirection}
          >
            Amount
          </HeaderButton>
          <HeaderButton
            onClick={handleHeaderClick("usdValue")}
            _activeSortKey={sortKey}
            _sortKey="usdValue"
            _sortDirection={sortDirection}
          >
            USD Value
          </HeaderButton>
          <>TX Hash</>
          <span className="flex justify-center">Status</span>
          <span className="flex justify-center">Receipt</span>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="even:bg-orange-l6 dark:odd:bg-blue-d6 dark:even:bg-blue-d7 divide-x divide-prim"
        selectedClass="bg-orange-l5 dark:bg-blue-d4"
      >
        {sorted
          .map((row) => (
            <Cells
              key={row.hash}
              type="td"
              cellClass={`p-3 border-t border-gray-l4 max-w-[256px] truncate ${
                hasMore ? "" : "first:rounded-bl last:rounded-br"
              }`}
            >
              <Link
                to={`${
                  appRoutes[
                    row.chainId === chainIds.juno ? "profile" : "marketplace"
                  ]
                }/${row.id}`}
                className="flex items-center justify-between gap-1 cursor-pointer text-sm hover:underline"
              >
                <span className="truncate max-w-[12rem]">
                  {row.charityName}
                </span>
                <Icon type="ExternalLink" className="w-5 h-5" />
              </Link>
              <>{new Date(row.date).toLocaleDateString()}</>
              <>{row.chainName}</>
              <span className="text-sm">{row.symbol}</span>
              <>{humanize(row.amount, 3)}</>
              <>{`$${humanize(row.usdValue, 2)}`}</>
              {row.chainId === "fiat" || row.chainId === "staging" ? (
                <>- - -</>
              ) : (
                <ExtLink
                  href={getTxUrl(row.chainId, row.hash)}
                  className="text-center text-blue hover:text-blue-l2 cursor-pointer uppercase text-sm"
                >
                  {row.hash}
                </ExtLink>
              )}
              <div className="text-center text-white">
                <span
                  className={`${
                    row.donationFinalized
                      ? "bg-green"
                      : "bg-gray-d1 dark:bg-gray"
                  } px-2 py-0.5 rounded`}
                >
                  {row.donationFinalized ? "RECEIVED" : "PENDING"}
                </span>
              </div>
              <button
                className="w-full flex justify-center"
                onClick={() => showKYCForm(row.hash)}
              >
                <Icon type="FatArrowDownload" className="text-2xl" />
              </button>
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
