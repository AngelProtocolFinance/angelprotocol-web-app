import { PropsWithChildren } from "react";
import { ApplicationDetails } from "types/aws";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import Container from "./Container";

export default function Loaded(props: ApplicationDetails) {
  const { ContactPerson: c, Registration: r, WiseRecipient: w } = props;
  const doc = r.Documentation;
  return (
    <>
      <h3 className="text-lg">{r.OrganizationName}</h3>
      <div className="flex max-sm:flex-col gap-x-4">
        <span className="text-sm font-semibold uppercase">Application ID:</span>
        <span className="uppercase text-sm font-work">{r.PK}</span>
      </div>
      <div className="flex max-sm:flex-col gap-x-4 -mt-2 lg:-mt-4">
        <span className="text-sm font-semibold uppercase">Date submitted:</span>
        <span className="uppercase text-sm font-work">
          {new Date(r.RegistrationDate).toLocaleDateString()}
        </span>
      </div>

      <Container title="Endowment application">
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
              <Row label="Charity registration doc">
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
        <div className="grid sm:grid-cols-[auto_auto_1fr]">
          <Row label="Bank name">{w.bankName}</Row>
          <Row label="Address">{w.address}</Row>
          <Row label="Account number">{w.accountNumber}</Row>
          <Row label="Account holder name">{w.accountName}</Row>
          <Row label="Bank statement document">
            <DocLink url={r.BankStatementFile.publicUrl} />
          </Row>
        </div>
      </Container>
      <div className="flex gap-x-3 justify-self-center sm:justify-self-end">
        <button
          type="button"
          className="px-4 py-1 min-w-[6rem] font-work text-sm uppercase btn-outline"
        >
          back
        </button>
        <button
          type="button"
          className="px-4 py-1 min-w-[6rem] font-work text-sm uppercase btn-red"
        >
          reject
        </button>
        <button
          type="button"
          className="px-4 py-1 min-w-[6rem] font-work text-sm uppercase btn-green"
        >
          approve
        </button>
      </div>
    </>
  );
}

function DocLink({ url }: { url: string }) {
  return (
    <ExtLink href={url} className="flex items-center gap-2">
      <span>{url}</span>
      <Icon type="ExternalLink" />
    </ExtLink>
  );
}

type Props = PropsWithChildren<{
  label: string;
}>;
function Row(props: Props) {
  return (
    <>
      <div className="px-3 max-sm:pt-3 sm:p-3 flex items-center text-xs font-semibold uppercase">
        {props.label}
      </div>
      <div className="max-sm:hidden w-px border-r border-prim last:border-none" />
      <div className="px-3 max-sm:pb-3 sm:p-3 flex items-center text-sm">
        {props.children}
      </div>
      <div className="h-px col-span-full border-b border-prim last:border-none" />
    </>
  );
}
