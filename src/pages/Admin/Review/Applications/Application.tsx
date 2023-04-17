import { PropsWithChildren } from "react";
import { useParams } from "react-router-dom";
import { FileObject, InReview } from "types/aws";
import { useRegQuery } from "services/aws/registration";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import QueryLoader from "components/QueryLoader";

export default function Application() {
  const { id: ref = "" } = useParams();
  const query = useRegQuery(ref, {
    skip: !ref,
  });

  return (
    <QueryLoader
      queryState={query}
      messages={{
        loading: "Getting registration details",
        error: "Failed to get registration details",
      }}
    >
      {(reg) => <Summary {...(reg as InReview)} />}
    </QueryLoader>
  );
}

function Summary({ Registration: r, ContactPerson: c }: InReview) {
  return (
    <div>
      <h3 className="text-xl font-semibold">{r.OrganizationName}</h3>
      <p className="text-sm mb-6 flex items-center gap-1">
        <ExtLink href={r.Website}>
          <Icon type="Globe" size={16} />
        </ExtLink>
        <span>{c.Email}</span>
      </p>

      <Label>Registration Date</Label>
      <span className="text-sm">
        {new Date(r.RegistrationDate).toLocaleDateString()}
      </span>

      <Label classes="mt-4 mb-1">Documents</Label>
      <Documents label="Proof of Identity" docs={[r.ProofOfIdentity]} />
      <Documents label="Proof of Registration" docs={[r.ProofOfRegistration]} />
      <Documents
        label="Financial Statement"
        docs={r.FinancialStatements || []}
      />
      <Documents
        label="Audited Financial Report"
        docs={r.AuditedFinancialReports || []}
      />
    </div>
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
          className="uppercase text-sm flex items-center gap-1 hover:text-blue-l1 mb-1"
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
