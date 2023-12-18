import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { BankingApplicationDetails } from "services/types";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import { appRoutes } from "constants/routes";

export default function Loaded(props: BankingApplicationDetails) {
  const prevVerdict = props.status !== "under-review" ? props.status : null;

  return (
    <>
      {prevVerdict && (
        <div
          className={`${
            prevVerdict === "approved" ? "bg-green" : "bg-red"
          } text-white px-2 py-1 text-xs font-work uppercase rounded justify-self-start -mt-3 lg:-mt-6`}
        >
          {prevVerdict === "approved" ? "Approved" : "Rejected"}
        </div>
      )}
      <div className="flex max-sm:flex-col gap-x-4">
        <span className="text-sm font-semibold uppercase">Account ID:</span>
        <span className="uppercase text-sm font-work">{props.id}</span>
      </div>
      <div className="flex max-sm:flex-col gap-x-4 -mt-2 lg:-mt-4">
        <span className="text-sm font-semibold uppercase">Date submitted:</span>
        <span className="uppercase text-sm font-work">
          {new Date(props.dateCreated).toLocaleDateString()}
        </span>
      </div>

      <dl className="grid sm:grid-cols-[auto_auto_1fr] border border-prim rounded">
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
            <Icon
              type="ExternalLink"
              className="inline relative bottom-px ml-2"
              size={15}
            />
          </ExtLink>
        </Row>
      </dl>
      <div className="flex gap-x-3 justify-self-center sm:justify-self-end">
        <Link
          to={appRoutes.applications}
          className="px-4 py-1 min-w-[6rem] font-work text-sm uppercase btn-outline"
        >
          back
        </Link>
        <button
          disabled={!!prevVerdict}
          type="button"
          className="px-4 py-1 min-w-[6rem] font-work text-sm uppercase btn-red"
        >
          reject
        </button>
        <button
          disabled={!!prevVerdict}
          type="button"
          className="px-4 py-1 min-w-[6rem] font-work text-sm uppercase btn-green"
        >
          approve
        </button>
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
        className="max-sm:hidden w-px border-r border-prim last:border-none"
      />
      <dd className="px-3 max-sm:pb-3 sm:p-3 flex items-center text-sm">
        {props.children}
      </dd>
      <div
        aria-hidden={true}
        className="h-px col-span-full border-b border-prim last:border-none"
      />
    </>
  );
}
