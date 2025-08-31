import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import ExtLink from "components/ext-link";
import { DrawerIcon } from "components/icon";
import { appRoutes } from "constants/routes";
import { humanize } from "helpers/decimal";
import useSort from "hooks/use-sort";
import { ArrowDownToLine } from "lucide-react";
import type { PropsWithChildren } from "react";
import { Link } from "react-router";
import type { Donation } from "types/donations";
import { donationMethod, lastHeaderName } from "./common";
import LoadMoreBtn from "./load-more-btn";
import PaymentResumer from "./payment-resumer";
import type { TableProps } from "./types";

export default function MobileTable({
  donations,
  classes = "",
  disabled,
  isLoading,
  hasMore,
  status,
  onLoadMore,
}: TableProps) {
  const { sorted } = useSort(donations, "date");

  return (
    <div
      className={`${classes} border border-blue-l2 ${
        hasMore ? "rounded-t" : "rounded-sm"
      }`}
    >
      <div className="grid items-center grid-cols-[auto_1fr_auto] h-12 uppercase text-xs font-bold bg-blue-l5 dark:bg-blue-d7 border-b border-blue-l2 divide-x divide-blue-l2 rounded-t">
        <div className="w-12" />
        <div className="p-4">Recipient</div>
        <div className="p-4 w-28 text-center">Date</div>
      </div>

      {sorted.map((row, index) => (
        <Disclosure
          key={index}
          as="div"
          className={`text-sm odd:bg-blue-l5 dark:even:bg-blue-d6 dark:odd:bg-blue-d7 w-full border-b last:border-0 border-blue-l2 ${
            hasMore ? "" : "last:rounded-b"
          }`}
        >
          {({ open }) => (
            <>
              <DisclosureButton
                className={`${
                  open ? "bg-blue-l5 dark:bg-blue-d4" : ""
                } w-full grid grid-cols-[auto_1fr_auto] divide-x divide-blue-l2`}
              >
                <DrawerIcon
                  size={20}
                  className={`${
                    open ? "text-blue-d1" : ""
                  } w-12 place-self-center`}
                  isOpen={open}
                />
                <p className="text-sm p-4 text-left h-full truncate">
                  {row.recipient_name}
                </p>
                <div className="p-4 text-center text-sm w-28">
                  {new Date(row.date).toLocaleDateString()}
                </div>
              </DisclosureButton>
              <DisclosurePanel className="w-full divide-y divide-blue-l2">
                <Row title="Program">
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
                </Row>
                <Row title="Donation Type" className="capitalize">
                  {donationMethod(
                    row.payment_method ?? { id: row.via_id, name: row.via_name }
                  )}
                </Row>
                <Row title="Recurring">{row.is_recurring ? "YES" : "NO"}</Row>
                <Row title="Currency">{row.symbol}</Row>
                <Row title="Amount">{humanize(row.init_amount, 3)}</Row>
                <Row title="USD Value">
                  {row.init_amount_usd
                    ? `$${humanize(row.init_amount_usd, 2)}`
                    : "--"}
                </Row>
                <Row title={lastHeaderName[status]} className="rounded-b">
                  <LastRowContent {...row} status={status} />
                </Row>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}
      {hasMore && (
        <LoadMoreBtn
          onLoadMore={onLoadMore}
          disabled={disabled}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

function Row({
  className = "",
  title,
  children,
}: PropsWithChildren<{ className?: string; title: string }>) {
  return (
    <div
      className={`flex justify-between p-4 odd:bg-white even:bg-blue-l5 dark:bg-blue-d7 ${className}`}
    >
      <span className="font-bold uppercase">{title}</span>
      <span className="truncate max-w-[167px]">{children}</span>
    </div>
  );
}

function LastRowContent(props: Donation.Item & { status: Donation.Status }) {
  if (props.status === "final") {
    return (
      <Link to={props.id} className="block">
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

  return props.id;
}
