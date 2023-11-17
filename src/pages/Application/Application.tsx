import { PropsWithChildren } from "react";
import { applications } from "services/aws/constants";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon/Icon";
import Container from "./Container";

const app = applications[0];
const doc = app.Documentation;
export default function Application() {
  return (
    <div className="grid content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative padded-container pt-8 lg:pt-20 pb-8">
      <h1 className="text-center text-3xl max-lg:font-work col-span-full max-lg:mb-4">
        Applications Review - Details
      </h1>
      <h3 className="text-lg">{app.OrganizationName}</h3>
      <div className="flex max-sm:flex-col gap-x-4">
        <span className="text-sm font-semibold uppercase">Application ID:</span>
        <span className="uppercase text-sm font-work">{app.PK}</span>
      </div>
      <div className="flex max-sm:flex-col gap-x-4 -mt-2 lg:-mt-4">
        <span className="text-sm font-semibold uppercase">Date submitted:</span>
        <span className="uppercase text-sm font-work">
          {new Date(app.RegistrationDate).toLocaleDateString()}
        </span>
      </div>

      <Container title="Endowment application">
        <div className="grid sm:grid-cols-[auto_auto_1fr]">
          {doc.DocType === "FSA" ? (
            <Row label="Registration No.">{doc.RegistrationNumber}</Row>
          ) : (
            <Row label="EIN">{doc.EIN}</Row>
          )}
          <Row label="HQ Country">{app.HqCountry}</Row>
          <Row label="Countries active in">
            {app.ActiveInCountries.join(", ")}
          </Row>
          <Row label="UN SDG">{app.UN_SDG.join(", ")}</Row>
          <Row label="Contact name">{app.FirstName + " " + app.LastName}</Row>
          <Row label="Contact email">{app.Email}</Row>
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
          <Row label="Bank name">Great Bank of Northwest Luzon</Row>
          <Row label="Address">123 Winding Road, Singapore</Row>
          <Row label="Account number">012345678910</Row>
          <Row label="Account holder name">Jesse Pinkman</Row>
          <Row label="Anticipated monthly donations (USD)">$10,000</Row>
          <Row label="Bank statement document">
            <DocLink url="https://google.com" />
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
    </div>
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
