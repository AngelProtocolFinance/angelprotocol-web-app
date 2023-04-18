import { PropsWithChildren } from "react";
import { TxType } from "./types";
import { FileObject, InReview } from "types/aws";
import { useModalContext } from "contexts/ModalContext";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import Proposer from "./Proposer";

export default function Summary({
  Registration: r,
  ContactPerson: c,
  appId,
}: InReview & { appId: number }) {
  const txId = r.approve_tx_id || r.reject_tx_id;
  const txType: TxType = r.approve_tx_id ? "approve" : "reject";

  return (
    <div className="w-full p-6 grid content-start gap-2 rounded bg-white dark:bg-blue-d6 border border-prim">
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
      {txId ? <Review appId={+appId} /> : <></>}
    </div>
  );
}

type Props = {
  appId: number;
};
function Review({ appId }: Props) {
  const { showModal } = useModalContext();

  const review = (type: TxType) => () => showModal(Proposer, { appId, type });

  return (
    <div>
      <button type="button" onClick={review("approve")}>
        approve
      </button>
      <button type="button" onClick={review("reject")}>
        reject
      </button>
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
