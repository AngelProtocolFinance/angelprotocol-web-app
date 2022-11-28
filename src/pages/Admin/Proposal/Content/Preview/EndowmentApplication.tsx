import { PropsWithChildren } from "react";
import { EndowmentProposal, FileObject } from "types/aws";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import PreviewContainer from "./common/PreviewContainer";

export default function EndowmentApplication(props: EndowmentProposal) {
  return (
    <PreviewContainer classes="grid">
      <h3 className="text-xl font-semibold">{props.OrganizationName}</h3>
      <p className="text-sm mb-6 flex items-center gap-1">
        <ExtLink href={props.Website}>
          <Icon type="Globe" size={16} />
        </ExtLink>
        <span>{props.Email}</span>
      </p>

      <Label>Registration Date</Label>
      <span>{new Date(props.RegistrationDate).toLocaleDateString()}</span>

      <Label classes="mt-4 mb-1">Documents</Label>
      <Documents label="Proof of Identity" docs={[props.ProofOfIdentity]} />
      <Documents
        label="Proof of Registration"
        docs={[props.ProofOfRegistration]}
      />
      <Documents
        label="Financial Statement"
        docs={props.FinancialStatements || []}
      />
      <Documents
        label="Audited Financial Report"
        docs={props.AuditedFinancialReports || []}
      />
    </PreviewContainer>
  );
}

function Label(props: PropsWithChildren<{ classes?: string }>) {
  return (
    <span {...props} className={`text-xs uppercase ${props.classes || ""}`} />
  );
}

function Documents({ docs, label }: { docs: FileObject[]; label: string }) {
  return (
    <>
      {docs.map((doc, i) => (
        <ExtLink
          href={doc.publicUrl}
          key={i}
          className="font-heading uppercase text-sm flex items-center gap-1 text-blue-l5 hover:text-blue-l1 mb-1"
        >
          <Icon type="ExternalLink" />
          <span>
            {label} {docs.length <= 1 ? "" : i + 1}
          </span>
        </ExtLink>
      ))}
    </>
  );
}
