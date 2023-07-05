import { PropsWithChildren } from "react";
import { FileObject, InReview } from "types/aws";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import Seo from "components/Seo";
import { APP_NAME, DAPP_URL } from "constants/env";
import { adminRoutes, appRoutes } from "constants/routes";
import { useAdminContext } from "../../../Context";
import Proposal from "./Proposal";

export default function Summary({
  Registration: r,
  ContactPerson: c,
}: InReview) {
  const { id } = useAdminContext();

  return (
    <div className="w-full p-6 grid content-start gap-2 rounded bg-white dark:bg-blue-d6 border border-prim">
      <Seo
        title={`Summary - ${APP_NAME}`}
        description={`Application Summary for ${r.OrganizationName}`}
        url={`${DAPP_URL}/${appRoutes.admin}/${id}/${adminRoutes.application}/${r.PK}`}
      />
      <h3 className="text-xl font-semibold">{r.OrganizationName}</h3>
      <p className="text-sm mb-6 flex items-center gap-1">
        <ExtLink href={r.Website}>
          <Icon type="Globe" size={16} />
        </ExtLink>
        <span>{c.Email}</span>
      </p>

      <Label classes="mt-2">Registration Date</Label>
      <span className="text-sm">
        {new Date(r.RegistrationDate).toLocaleDateString()}
      </span>

      <Label classes="mt-6 mb-1">Documents</Label>
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

      <Proposal txId={r.application_id} />
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
