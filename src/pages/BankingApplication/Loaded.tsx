import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import { appRoutes } from "constants/routes";
import { useModalContext } from "contexts/ModalContext";
import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import type { BankingApplicationDetails } from "services/types";
import Prompt from "./Prompt";

export default function Loaded(props: BankingApplicationDetails) {
  const isApproved = props.status === "approved";
  const isRejected = props.status === "rejected";
  const prevVerdict = isApproved || isRejected;

  const { showModal } = useModalContext();
  const verdict = (value: "approve" | "reject") => () => {
    showModal(Prompt, { uuid: props.id.toString(), verdict: value });
  };

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
          to={appRoutes.banking_applications}
          className="px-4 py-1 min-w-[6rem] text-sm uppercase btn-outline"
        >
          back
        </Link>
        <button
          disabled={!!prevVerdict}
          onClick={verdict("reject")}
          type="button"
          className="px-4 py-1 min-w-[6rem] text-sm uppercase btn-red"
        >
          reject
        </button>
        <button
          disabled={!!prevVerdict}
          onClick={verdict("approve")}
          type="button"
          className="px-4 py-1 min-w-[6rem] text-sm uppercase btn-green"
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
