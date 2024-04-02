import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import { appRoutes } from "constants/routes";
import { useModalContext } from "contexts/ModalContext";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { ApplicationDetails } from "types/aws";
import Container from "./Container";
import Prompt from "./Prompt";

const NA = "Not provided";

export default function Loaded(props: ApplicationDetails) {
  const { showModal } = useModalContext();
  const { ContactPerson: c, Registration: r, WiseRecipient: w } = props;
  const doc = r.Documentation;

  const review = (verdict: "approve" | "reject") => () => {
    showModal(Prompt, { verdict, uuid: c.PK, orgName: r.OrganizationName });
  };

  const prevVerdict =
    r.RegistrationStatus === "Active" || r.RegistrationStatus === "Rejected"
      ? r.RegistrationStatus
      : null;

  const claim = doc.DocType === "Non-FSA" ? doc.Claim : undefined;

  return (
    <>
      <h3 className="text-lg">{r.OrganizationName}</h3>
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
            prevVerdict === "Active" ? "bg-green" : "bg-red"
          } text-white px-2 py-1 text-xs uppercase rounded justify-self-start -mt-3 lg:-mt-6`}
        >
          {prevVerdict === "Active" ? "Approved" : "Rejected"}
        </div>
      )}
      {r.RegistrationStatus === "Rejected" && (
        <div className="flex max-sm:flex-col gap-x-4">
          <span className="text-sm font-semibold uppercase">
            Rejection reason:
          </span>
          <span className="uppercase text-sm">{r.RejectionReason}</span>
        </div>
      )}
      <div className="flex max-sm:flex-col gap-x-4">
        <span className="text-sm font-semibold uppercase">Application ID:</span>
        <span className="text-sm">{r.PK}</span>
      </div>
      <div className="flex max-sm:flex-col gap-x-4 -mt-2 lg:-mt-4">
        <span className="text-sm font-semibold uppercase">Date submitted:</span>
        <span className="uppercase text-sm">
          {new Date(r.RegistrationDate).toLocaleDateString()}
        </span>
      </div>

      <Container title="nonprofit application">
        <div className="grid sm:grid-cols-[auto_auto_1fr]">
          {doc.DocType === "FSA" ? (
            <Row label="Registration No.">{doc.RegistrationNumber}</Row>
          ) : (
            <Row label="EIN">{doc.EIN}</Row>
          )}
          <Row label="HQ Country">{r.HqCountry}</Row>
          <Row label="Countries active in">
            {r.ActiveInCountries.join(", ")}
          </Row>
          <Row label="UN SDG">{r.UN_SDG.join(", ")}</Row>
          <Row label="Contact name">{c.FirstName + " " + c.LastName}</Row>
          <Row label="Contact email">{c.Email}</Row>
          {doc.DocType === "FSA" && (
            <>
              <Row label="Contact national ID">
                <DocLink url={doc.ProofOfIdentity.publicUrl} />
              </Row>
              <Row label="Nonprofit registration doc">
                <DocLink url={doc.ProofOfRegistration.publicUrl} />
              </Row>
              <Row label="Fiscal sponsorship agreement">
                <DocLink url={doc.SignedFiscalSponsorshipAgreement ?? ""} />
              </Row>
            </>
          )}
        </div>
      </Container>
      <Container title="Banking details">
        <dl className="grid sm:grid-cols-[auto_auto_1fr]">
          <Row label="Bank name">{w?.bankName || NA}</Row>
          <Row label="Address">{w?.address || NA}</Row>
          <Row label="Account number">{w?.accountNumber || NA}</Row>
          <Row label="Account holder name">{w?.accountName || NA}</Row>
          <Row label="Bank statement document">
            <DocLink url={r.BankStatementFile.publicUrl} />
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
