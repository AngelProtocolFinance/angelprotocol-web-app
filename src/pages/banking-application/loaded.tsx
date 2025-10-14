import { ExtLink } from "components/ext-link";
import { SquareArrowOutUpRight } from "lucide-react";
import type { PropsWithChildren } from "react";
import { NavLink, href } from "react-router";
import type { LoaderData } from "./api";

export function Loaded(props: LoaderData) {
  const is_approved = props.ba.status === "approved";
  const is_rejected = props.ba.status === "rejected";
  const prev_verdict = is_approved || is_rejected;

  return (
    <>
      {prev_verdict && (
        <div
          className={`${
            is_approved ? "bg-green" : "bg-red"
          } text-white px-2 py-1 text-xs uppercase rounded justify-self-start -mt-3 lg:-mt-6`}
        >
          {is_approved ? "Approved" : "Rejected"}
        </div>
      )}
      {is_rejected && (
        <p className="text-red text-sm -mt-3">{props.ba.rejection_reason}</p>
      )}
      <div className="flex max-sm:flex-col gap-x-4">
        <span className="text-sm  font-medium uppercase">Account ID:</span>
        <span className="uppercase text-sm">{props.id}</span>
      </div>
      <div className="flex max-sm:flex-col gap-x-4 -mt-2 lg:-mt-4">
        <span className="text-sm  font-medium uppercase">Date submitted:</span>
        <span className="uppercase text-sm">
          {new Date(props.ba.date_created).toLocaleDateString()}
        </span>
      </div>

      <dl className="grid sm:grid-cols-[auto_auto_1fr] border border-gray-l3 rounded-sm">
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
            href={props.ba.bank_statement_file.publicUrl}
            className="text-blue hover:text-blue-d1"
          >
            <span className="break-all">
              {props.ba.bank_statement_file.publicUrl}
            </span>
            <SquareArrowOutUpRight
              className="inline relative bottom-px ml-2"
              size={15}
            />
          </ExtLink>
        </Row>
      </dl>
      <div className="flex gap-x-3 justify-self-center sm:justify-self-end">
        <NavLink
          replace
          preventScrollReset
          to={href("/banking-applications")}
          className="px-4 py-1 min-w-[6rem] text-sm uppercase btn btn-outline"
        >
          back
        </NavLink>
        <NavLink
          replace
          preventScrollReset
          aria-disabled={!!prev_verdict}
          to="reject"
          className="px-4 py-1 min-w-[6rem] text-sm uppercase btn btn-red"
        >
          reject
        </NavLink>
        <NavLink
          replace
          preventScrollReset
          aria-disabled={!!prev_verdict}
          to="approve"
          className="px-4 py-1 min-w-[6rem] text-sm uppercase btn btn-green"
        >
          approve
        </NavLink>
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
      <dt className="px-3 max-sm:pt-3 sm:p-3 flex items-center text-xs  font-medium uppercase">
        {props.label}
      </dt>
      <div
        aria-hidden={true}
        className="max-sm:hidden w-px border-r border-gray-l3 last:border-none"
      />
      <dd className="px-3 max-sm:pb-3 sm:p-3 flex items-center text-sm">
        {props.children}
      </dd>
      <div
        aria-hidden={true}
        className="h-px col-span-full border-b border-gray-l3 last:border-none"
      />
    </>
  );
}
