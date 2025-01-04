import { Link } from "@remix-run/react";
import ExtLink from "components/ExtLink";
import { appRoutes } from "constants/routes";
import { SquareArrowOutUpRight } from "lucide-react";
import type { PropsWithChildren } from "react";
import type { BankingApplicationDetails } from "services/types";

export function Loaded(props: BankingApplicationDetails) {
  const isApproved = props.status === "approved";
  const isRejected = props.status === "rejected";
  const prevVerdict = isApproved || isRejected;

  return (
    <>
      {prevVerdict && (
        <div
          className={`${
            isApproved ? "bg-green" : "bg-red"
          } text-white px-2 py-1 text-xs uppercase rounded justify-self-start -mt-3 lg:-mt-6`}
        >
          {isApproved ? "Approved" : "Rejected"}
        </div>
      )}
      {isRejected && (
        <p className="text-red text-sm -mt-3">{props.rejectionReason}</p>
      )}
      <div className="flex max-sm:flex-col gap-x-4">
        <span className="text-sm font-semibold uppercase">Account ID:</span>
        <span className="uppercase text-sm">{props.id}</span>
      </div>
      <div className="flex max-sm:flex-col gap-x-4 -mt-2 lg:-mt-4">
        <span className="text-sm font-semibold uppercase">Date submitted:</span>
        <span className="uppercase text-sm">
          {new Date(props.dateCreated).toLocaleDateString()}
        </span>
      </div>

      <dl className="grid sm:grid-cols-[auto_auto_1fr] border border-gray-l4 rounded">
        <Row label="Currency">{props.currency}</Row>
        <Row label="Country">{props.country}</Row>
        <Row label="Recipient name">{props.name.fullName}</Row>
        <Row label="Account type">{props.type}</Row>
        <Row label="Legal entity type">{props.legalEntityType}</Row>
        {props.displayFields.map(({ label, value, key }) => (
          <Row key={key} label={label}>
            {value}
          </Row>
        ))}
        <Row label="Bank statement">
          <ExtLink
            href={props.bankStatementFile.publicUrl}
            className="text-blue hover:text-blue-d1"
          >
            <span className="break-all">
              {props.bankStatementFile.publicUrl}
            </span>
            <SquareArrowOutUpRight
              className="inline relative bottom-px ml-2"
              size={15}
            />
          </ExtLink>
        </Row>
      </dl>
      <div className="flex gap-x-3 justify-self-center sm:justify-self-end">
        <Link
          replace
          preventScrollReset
          to={appRoutes.banking_applications}
          className="px-4 py-1 min-w-[6rem] text-sm uppercase btn-outline"
        >
          back
        </Link>
        <Link
          replace
          preventScrollReset
          aria-disabled={!!prevVerdict}
          to="reject"
          className="px-4 py-1 min-w-[6rem] text-sm uppercase btn-red"
        >
          reject
        </Link>
        <Link
          replace
          preventScrollReset
          aria-disabled={!!prevVerdict}
          to="approve"
          className="px-4 py-1 min-w-[6rem] text-sm uppercase btn-green"
        >
          approve
        </Link>
      </div>
    </>
  );
}

type Props = PropsWithChildren<{
  label: string;
}>;
function Row(props: Props) {
  return (
    <>
      <dt className="px-3 max-sm:pt-3 sm:p-3 flex items-center text-xs font-semibold uppercase">
        {props.label}
      </dt>
      <div
        aria-hidden={true}
        className="max-sm:hidden w-px border-r border-gray-l4 last:border-none"
      />
      <dd className="px-3 max-sm:pb-3 sm:p-3 flex items-center text-sm">
        {props.children}
      </dd>
      <div
        aria-hidden={true}
        className="h-px col-span-full border-b border-gray-l4 last:border-none"
      />
    </>
  );
}
