import { Link } from "@remix-run/react";
import ExtLink from "components/ExtLink";
import { HeaderButton } from "components/HeaderButton";
import TableSection, { Cells } from "components/TableSection";
import { juno } from "constants/chains";
import { appRoutes } from "constants/routes";
import { getTxUrl, humanize } from "helpers";
import useSort from "hooks/useSort";
import { ArrowDownToLine, SquareArrowUpRight } from "lucide-react";
import type { Donation } from "types/aws";
import LoadMoreBtn from "./LoadMoreBtn";
import PaymentResumer from "./PaymentResumer";
import { donationMethod, lastHeaderName } from "./common";
import type { TableProps } from "./types";

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
          <>Program</>
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
          <span className="flex justify-center">{lastHeaderName[status]}</span>
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
                <SquareArrowUpRight className="w-5 h-5" />
              </Link>
              {row.programId ? (
                <Link
                  className="text-blue hover:text-blue-d1"
                  to={`${appRoutes.profile}/${row.recipientId}/program/${row.programId}`}
                >
                  {row.programName}
                </Link>
              ) : (
                <>--</>
              )}
              <>{new Date(row.date).toLocaleDateString()}</>
              <span className="capitalize">
                {donationMethod(
                  row.paymentMethod ?? { id: row.viaId, name: row.viaName }
                )}
              </span>
              <>{row.isRecurring ? "YES" : "NO"}</>
              <span className="text-sm">{row.symbol}</span>
              <>{humanize(row.initAmount, 3)}</>
              <>
                {row.initAmountUsd
                  ? `$${humanize(row.initAmountUsd, 2)}`
                  : "--"}
              </>
              <LastRowColContent {...row} status={status} />
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

function LastRowColContent(
  props: Donation.Record & { status: Donation.Status }
) {
  if (props.status === "final") {
    return (
      <Link to={props.id} className="w-full flex justify-center">
        <ArrowDownToLine size={20} />
      </Link>
    );
  }

  if (
    props.status === "intent" &&
    props.viaId === "fiat" &&
    props.bankVerificationUrl
  ) {
    return (
      <ExtLink
        href={props.bankVerificationUrl}
        className="btn-blue px-3 py-1 text-xs"
      >
        Verify Bank Account
      </ExtLink>
    );
  }

  if (props.status === "intent" && props.viaId === "fiat") {
    return <>---</>;
  }

  if (props.status === "intent" && props.viaId !== "fiat") {
    return props.payment_id ? (
      <PaymentResumer paymentId={props.payment_id} amount={props.initAmount} />
    ) : (
      <>---</>
    );
  }

  /// pending ///

  if (props.viaId === "fiat" || props.viaId === "staging") {
    return <>---</>;
  }

  return (
    <ExtLink
      href={getTxUrl(props.viaId, props.id)}
      className="text-center text-blue-d1 hover:text-navy-d1 uppercase text-sm"
    >
      {props.id}
    </ExtLink>
  );
}
