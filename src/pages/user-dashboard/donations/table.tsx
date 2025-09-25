import { Copier } from "components/copier";
import { ExtLink } from "components/ext-link";
import { HeaderButton } from "components/header-button";
import { Cells, TableSection } from "components/table-section";
import { app_routes } from "constants/routes";
import { toPP } from "helpers/date";
import { centsDecimals, humanize, roundToCents } from "helpers/decimal";
import { mask_string } from "helpers/mask-string";
import { use_sort } from "hooks/use-sort";
import { ArrowDownToLine } from "lucide-react";
import { Link } from "react-router";
import type { IPaginator } from "types/components";
import type { Donation } from "types/donations";
import { donationMethod, lastHeaderName } from "./common";
import { LoadMoreBtn } from "./load-more-btn";
import { PaymentResumer } from "./payment-resumer";

interface Props extends IPaginator<Donation.Item> {
  status: Donation.Status;
}

export function Table({
  items,
  classes = "",
  disabled,
  loading,
  status,
  load_next,
}: Props) {
  const { handleHeaderClick, sorted, sortDirection, sortKey } = use_sort(
    items,
    "date"
  );

  return (
    <table
      className={`${classes} w-full text-sm rounded-sm border border-separate border-spacing-0 border-gray-l3`}
    >
      <TableSection type="thead" rowClass="bg-blue-l4 divide-x divide-gray-l3">
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
            method
          </HeaderButton>
          <HeaderButton
            onClick={handleHeaderClick("init_amount")}
            _activeSortKey={sortKey}
            _sortKey="init_amount"
            _sortDirection={sortDirection}
          >
            Amount
          </HeaderButton>
          <span className="flex justify-center">{lastHeaderName[status]}</span>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="even:bg-blue-l5 divide-x divide-gray-l3"
        selectedClass="bg-blue-l4 dark:bg-blue-d4"
      >
        {sorted
          .map((row) => (
            <Cells
              key={row.id}
              type="td"
              cellClass={`p-3 border-t border-gray-l3 max-w-[256px] truncate ${
                load_next ? "" : "first:rounded-bl last:rounded-br"
              }`}
            >
              <Link
                to={`${app_routes.marketplace}/${row.recipient_id}`}
                className="flex items-center justify-between gap-1 text-blue hover:text-blue-d1"
              >
                <span className="truncate max-w-[12rem]">
                  {row.recipient_name}
                </span>
              </Link>
              {row.program_id ? (
                <Link
                  className="text-blue hover:text-blue-d1"
                  to={`${app_routes.profile}/${row.recipient_id}/program/${row.program_id}`}
                >
                  {row.program_name}
                </Link>
              ) : (
                <>--</>
              )}
              <>{toPP(row.date)}</>
              <span className="capitalize">
                {donationMethod(
                  row.payment_method ?? { id: row.via_id, name: row.via_name }
                )}
              </span>
              <td>
                <div>
                  {row.symbol}{" "}
                  {roundToCents(
                    row.init_amount,
                    centsDecimals(
                      (row.final_amount_usd || 0) /
                        (row.init_amount || Number.MAX_SAFE_INTEGER)
                    )
                  )}{" "}
                  <span className="text-gray text-sm">
                    {row.init_amount_usd && row.symbol !== "USD"
                      ? `$${humanize(row.init_amount_usd)}`
                      : null}
                  </span>
                  <p className="text-2xs text-gray-d1 uppercase">
                    {row.is_recurring ? "recurring" : "one time"}
                  </p>
                </div>
              </td>
              <LastRowColContent {...row} status={status} />
            </Cells>
          ))
          .concat(
            load_next ? (
              <td
                colSpan={9}
                key="load-more-btn"
                className="border-t border-gray-l3 rounded-b"
              >
                <LoadMoreBtn
                  onLoadMore={load_next}
                  disabled={disabled}
                  isLoading={loading}
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
      <PaymentResumer
        payment_id={props.payment_id}
        amount={props.init_amount}
      />
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
      {mask_string(props.id)}
    </Copier>
  );
}
