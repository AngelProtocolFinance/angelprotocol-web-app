import { Link } from "@remix-run/react";
import Copier from "components/copier";
import ExtLink from "components/ext-link";
import { HeaderButton } from "components/header-button";
import TableSection, { Cells } from "components/table-section";
import { appRoutes } from "constants/routes";
import { dateFormat } from "helpers/date-format";
import { humanize } from "helpers/decimal";
import { maskAddress } from "helpers/mask-address";
import useSort from "hooks/use-sort";
import { ArrowDownToLine } from "lucide-react";
import type { Donation } from "types/donations";
import { donationMethod, lastHeaderName } from "./common";
import LoadMoreBtn from "./load-more-btn";
import PaymentResumer from "./payment-resumer";
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
      className={`${classes} w-full text-sm rounded-sm border border-separate border-spacing-0 border-blue-l2`}
    >
      <TableSection type="thead" rowClass="bg-blue-l4 divide-x divide-blue-l2">
        <Cells
          type="th"
          cellClass="px-3 py-4 text-xs uppercase font-semibold text-left first:rounded-tl last:rounded-tr"
        >
          <HeaderButton
            onClick={handleHeaderClick("recipient_name")}
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
            onClick={handleHeaderClick("via_name")}
            _activeSortKey={sortKey}
            _sortKey="via_name"
            _sortDirection={sortDirection}
          >
            Donation Type
          </HeaderButton>
          <>Recurring</>
          <>Currency</>
          <HeaderButton
            onClick={handleHeaderClick("init_amount")}
            _activeSortKey={sortKey}
            _sortKey="init_amount"
            _sortDirection={sortDirection}
          >
            Amount
          </HeaderButton>
          <HeaderButton
            onClick={handleHeaderClick("init_amount_usd")}
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
                to={`${appRoutes.marketplace}/${row.recipient_id}`}
                className="flex items-center justify-between gap-1 text-blue hover:text-blue-d1"
              >
                <span className="truncate max-w-[12rem]">
                  {row.recipient_name}
                </span>
              </Link>
              {row.program_id ? (
                <Link
                  className="text-blue hover:text-blue-d1"
                  to={`${appRoutes.profile}/${row.recipient_id}/program/${row.program_id}`}
                >
                  {row.program_name}
                </Link>
              ) : (
                <>--</>
              )}
              <>{dateFormat(row.date)}</>
              <span className="capitalize">
                {donationMethod(
                  row.payment_method ?? { id: row.via_id, name: row.via_name }
                )}
              </span>
              <>{row.is_recurring ? "YES" : "NO"}</>
              <span className="text-sm">{row.symbol}</span>
              <>{humanize(row.init_amount, 3)}</>
              <>
                {row.init_amount_usd
                  ? `$${humanize(row.init_amount_usd, 2)}`
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

function LastRowColContent(props: Donation.Item & { status: Donation.Status }) {
  if (props.status === "final") {
    return (
      <Link to={props.id} className="w-full flex justify-center">
        <ArrowDownToLine size={20} />
      </Link>
    );
  }

  if (
    props.status === "intent" &&
    props.via_id === "fiat" &&
    props.bank_verification_url
  ) {
    return (
      <ExtLink
        href={props.bank_verification_url}
        className="btn btn-blue px-3 py-1 text-xs"
      >
        Verify Bank Account
      </ExtLink>
    );
  }

  if (props.status === "intent" && props.via_id === "fiat") {
    return <>---</>;
  }

  if (props.status === "intent" && props.via_id !== "fiat") {
    return props.payment_id ? (
      <PaymentResumer paymentId={props.payment_id} amount={props.init_amount} />
    ) : (
      <>---</>
    );
  }

  /// pending ///

  if (props.via_id === "fiat" || props.via_id === "staging") {
    return <>---</>;
  }

  return (
    <Copier
      size={16}
      text={props.id}
      classes="text-center inline-flex items-center gap-x-2 text-sm"
    >
      {maskAddress(props.id)}
    </Copier>
  );
}
