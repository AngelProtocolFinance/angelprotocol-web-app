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
        <dl className="grid grid-cols-[auto_auto_1fr]">
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
                <ExtLink href={doc.ProofOfIdentity.publicUrl}>
                  <span>{doc.ProofOfIdentity.publicUrl}</span>
                  <Icon type="ExternalLink" />
                </ExtLink>
              </Row>
              <Row label="Charity registration doc">
                <ExtLink href={doc.ProofOfRegistration.publicUrl}>
                  {doc.ProofOfRegistration.publicUrl}
                  <Icon type="ExternalLink" />
                </ExtLink>
              </Row>
              <Row label="Fiscal sponsorship agreement">
                <ExtLink href={doc.SignedFiscalSponsorshipAgreement}>
                  {doc.SignedFiscalSponsorshipAgreement}
                  <Icon type="ExternalLink" />
                </ExtLink>
              </Row>
            </>
          )}
        </dl>
      </Container>
      <Container title="Banking details">
        <div>content</div>
      </Container>
    </div>
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
