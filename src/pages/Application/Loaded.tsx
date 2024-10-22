import type { Application } from "@better-giving/registration/approval";
import { isIrs501c3, isRejected } from "@better-giving/registration/models";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import { appRoutes } from "constants/routes";
import { useModalContext } from "contexts/ModalContext";
import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import Prompt from "./Prompt";

export default function Loaded(props: Application) {
  const { showModal } = useModalContext();

  const review = (verdict: "approve" | "reject") => () => {
    showModal(Prompt, {
      verdict,
      uuid: props.id,
      orgName: props.contact.org_name,
    });
  };

  const prevVerdict =
    props.status === "03"
      ? "approved"
      : props.status === "04"
        ? "rejected"
        : null;

  const claim = isIrs501c3(props.docs) ? props.docs.claim : null;

  return (
    <>
      <h3 className="text-lg">{props.contact.org_name}</h3>
      {claim && (
        <ExtLink
          className="-mt-7 justify-self-start text-sm rounded text-blue-d1 hover:underline"
          href={`${appRoutes.marketplace}/${claim.id}`}
        >
          Claim: {claim.name}, EIN: {claim.ein}
        </ExtLink>
      )}
      {prevVerdict && (
        <div
          className={`${
            prevVerdict === "approved" ? "bg-green" : "bg-red"
          } text-white px-2 py-1 text-xs uppercase rounded justify-self-start -mt-3 lg:-mt-6`}
        >
          {prevVerdict === "approved" ? "Approved" : "Rejected"}
        </div>
      )}
      {typeof props.submission === "object" &&
        "endowment_id" in props.submission && (
          <Link
            className="text-blue-d1 hover:underline block -mt-6 text-sm"
            to={appRoutes.marketplace + `/${props.submission.endowment_id}`}
          >
            Endowment ID: {props.submission.endowment_id}
          </Link>
        )}
      {isRejected(props.submission) && (
        <div className="flex max-sm:flex-col gap-x-4">
          <span className="text-sm font-semibold uppercase">
            Rejection reason:
          </span>
          <span className="uppercase text-sm">
            {props.submission.rejection}
          </span>
        </div>
      )}
      <div className="flex max-sm:flex-col gap-x-4">
        <span className="text-sm font-semibold uppercase">Application ID:</span>
        <span className="text-sm">{props.id}</span>
      </div>
      <div className="flex max-sm:flex-col gap-x-4 -mt-2 lg:-mt-4">
        <span className="text-sm font-semibold uppercase">Date submitted:</span>
        <span className="uppercase text-sm">
          {new Date(props.updated_at).toLocaleDateString()}
        </span>
      </div>

      <Container title="nonprofit application">
        <div className="grid sm:grid-cols-[auto_auto_1fr]">
          {!isIrs501c3(props.docs) ? (
            <Row label="Registration No.">{props.docs.registration_number}</Row>
          ) : (
            <Row label="EIN">{props.docs.ein}</Row>
          )}
          <Row label="HQ Country">{props.org.hq_country}</Row>
          <Row label="Countries active in">
            {props.org.active_in_countries?.join(", ") ?? "N/A"}
          </Row>
          <Row label="UN SDG">{props.org.un_sdg.join(", ")}</Row>
          <Row label="Contact name">
            {props.contact.first_name + " " + props.contact.last_name}
          </Row>
          <Row label="Contact email">{props.registrant_id}</Row>
          {!isIrs501c3(props.docs) && (
            <>
              <Row label="Contact national ID">
                <DocLink url={props.docs.proof_of_identity.publicUrl} />
              </Row>
              <Row label="Nonprofit registration doc">
                <DocLink url={props.docs.proof_of_reg.publicUrl} />
              </Row>
              <Row label="Fiscal sponsorship agreement">
                <DocLink url={props.docs.fsa_signed_doc_url ?? ""} />
              </Row>
            </>
          )}
        </div>
      </Container>
      <Container title="Banking details">
        <dl className="grid sm:grid-cols-[auto_auto_1fr]">
          <Row label="Account holder name">{props.banking.accountName}</Row>
          {props.banking.fields.map((f) => (
            <Row key={f.label} label={f.label}>
              {f.value}
            </Row>
          ))}
          <Row label="Bank statement document">
            <DocLink url={props.banking.bank_statement.publicUrl} />
          </Row>
        </dl>
      </Container>
      <div className="flex gap-x-3 justify-self-center sm:justify-self-end">
        <Link
          to={appRoutes.applications}
          className="px-4 py-1 min-w-[6rem] text-sm uppercase btn-outline"
        >
          back
        </Link>
        <button
          disabled={!!prevVerdict}
          onClick={review("reject")}
          type="button"
          className="px-4 py-1 min-w-[6rem] text-sm uppercase btn-red"
        >
          reject
        </button>
        <button
          disabled={!!prevVerdict}
          onClick={review("approve")}
          type="button"
          className="px-4 py-1 min-w-[6rem] text-sm uppercase btn-green"
        >
          approve
        </button>
      </div>
    </>
  );
}

function DocLink({ url }: { url: string }) {
  return (
    <ExtLink href={url} className="text-blue hover:text-blue-d1">
      <span className="break-all">{url}</span>
      <Icon
        type="ExternalLink"
        className="inline relative bottom-px ml-2"
        size={15}
      />
    </ExtLink>
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
