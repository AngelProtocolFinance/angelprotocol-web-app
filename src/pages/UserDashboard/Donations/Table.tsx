import ExtLink from "components/ExtLink";
import { HeaderButton } from "components/HeaderButton";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import { juno } from "constants/chains";
import { appRoutes } from "constants/routes";
import { getTxUrl, humanize } from "helpers";
import useSort from "hooks/useSort";
import { Link } from "react-router-dom";
import IntentResumer from "./IntentResumer";
import LoadMoreBtn from "./LoadMoreBtn";
import type { TableProps } from "./types";
import useShowKYCForm from "./useShowKYCForm";

export default function Table({
  donations,
  classes = "",
  disabled,
  isLoading,
  hasMore,
  status,
  onLoadMore,
}: TableProps) {
  const { handleHeaderClick, sorted, sortDirection, sortKey } = useSort(
    donations,
    "date"
  );

  const showKYCForm = useShowKYCForm();

  return (
    <table
      className={`${classes} w-full text-sm rounded border border-separate border-spacing-0 border-blue-l2`}
    >
      <TableSection type="thead" rowClass="bg-blue-l4 divide-x divide-blue-l2">
        <Cells
          type="th"
          cellClass="px-3 py-4 text-xs uppercase font-semibold text-left first:rounded-tl last:rounded-tr"
        >
          <HeaderButton
            onClick={handleHeaderClick("recipientName")}
            _activeSortKey={sortKey}
            _sortKey="recipientName"
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
            onClick={handleHeaderClick("viaName")}
            _activeSortKey={sortKey}
            _sortKey="viaName"
            _sortDirection={sortDirection}
          >
            Donation Type
          </HeaderButton>
          <>Recurring</>
          <>Currency</>
          <HeaderButton
            onClick={handleHeaderClick("initAmount")}
            _activeSortKey={sortKey}
            _sortKey="initAmount"
            _sortDirection={sortDirection}
          >
            Amount
          </HeaderButton>
          <HeaderButton
            onClick={handleHeaderClick("initAmountUsd")}
            _activeSortKey={sortKey}
            _sortKey="usdValue"
            _sortDirection={sortDirection}
          >
            USD Value
          </HeaderButton>
          <HeaderButton
            onClick={handleHeaderClick("directDonateAmount")}
            _activeSortKey={sortKey}
            _sortKey="directDonateAmount"
            _sortDirection={sortDirection}
          >
            Direct Donation
          </HeaderButton>
          <HeaderButton
            onClick={handleHeaderClick("sfDonateAmount")}
            _activeSortKey={sortKey}
            _sortKey="sfDonateAmount"
            _sortDirection={sortDirection}
          >
            Donation to Sustainability Fund
          </HeaderButton>
          {status === "intent" ? (
            <span className="flex justify-center">Action</span>
          ) : (
            <>TX Hash</>
          )}
          {status === "pending" && (
            <span className="flex justify-center">Action</span>
          )}
          {status === "final" && (
            <span className="flex justify-center">Receipt</span>
          )}
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="even:bg-blue-l5 divide-x divide-blue-l2"
        selectedClass="bg-blue-l4 dark:bg-blue-d4"
      >
        {sorted
          .map((row) => (
            <Cells
              key={row.id}
              type="td"
              cellClass={`p-3 border-t border-blue-l2 max-w-[256px] truncate ${
                hasMore ? "" : "first:rounded-bl last:rounded-br"
              }`}
            >
              <Link
                to={`${
                  appRoutes[row.viaId === juno.id ? "profile" : "marketplace"]
                }/${row.recipientId}`}
                className="flex items-center justify-between gap-1 cursor-pointer text-sm hover:underline"
              >
                <span className="truncate max-w-[12rem]">
                  {row.recipientName}
                </span>
                <Icon type="ExternalLink" className="w-5 h-5" />
              </Link>
              <>{new Date(row.date).toLocaleDateString()}</>
              <>{row.paymentMethod ?? "- - -"}</>
              <>{row.isRecurring ? "YES" : "NO"}</>
              <span className="text-sm">{row.symbol}</span>
              <>{humanize(row.initAmount, 3)}</>
              <>
                {row.initAmountUsd
                  ? `$${humanize(row.initAmountUsd, 2)}`
                  : "--"}
              </>
              <>
                {row.directDonateAmount
                  ? `$${humanize(row.directDonateAmount, 2)}`
                  : "--"}
              </>
              <>
                {row.sfDonateAmount
                  ? `$${humanize(row.sfDonateAmount, 2)}`
                  : "--"}
              </>
              {status === "intent" ? (
                <IntentResumer intentId={row.id} />
              ) : row.viaId === "fiat" || row.viaId === "staging" ? (
                <>- - -</>
              ) : (
                <ExtLink
                  href={getTxUrl(row.viaId, row.id)}
                  className="text-center text-blue-d1 hover:text-navy-d1 uppercase text-sm"
                >
                  {row.id}
                </ExtLink>
              )}
              {status === "pending" &&
                row.viaId === "fiat" &&
                (row.bankVerificationUrl ? (
                  <ExtLink
                    href={row.bankVerificationUrl}
                    className="btn-blue px-3 py-1 text-xs"
                  >
                    Verify Bank Account
                  </ExtLink>
                ) : (
                  <>- - -</>
                ))}
              {status === "final" && (
                <button
                  className="w-full flex justify-center"
                  onClick={() => showKYCForm(row.id)}
                >
                  <Icon type="FatArrowDownload" className="text-2xl" />
                </button>
              )}
            </Cells>
          ))
          .concat(
            hasMore ? (
              <td
                colSpan={9}
                key="load-more-btn"
                className="border-t border-blue-l2 rounded-b"
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
