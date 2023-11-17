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
      <p>Application ID: {app.PK}</p>

      <Container title="Endowment application">
        <div className="grid grid-cols-[auto_auto_1fr]">
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
        <div className="grid grid-cols-[auto_auto_1fr]">
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
      <div className="p-3 flex items-center text-sm font-semibold uppercase">
        {props.label}
      </div>
      <div className="w-px border-r border-prim last:border-none" />
      <div className="p-3 flex items-center">{props.children}</div>
      <div className="h-px col-span-full border-b border-prim last:border-none" />
    </>
  );
}
