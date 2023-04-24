import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { TxType } from "../types";
import { FileObject, InReview } from "types/aws";
import { useModalContext } from "contexts/ModalContext";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import { adminRoutes } from "constants/routes";
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
      {txId ? (
        <Link
          to={`../${adminRoutes.proposal}/${txId}`}
          className="text-sm text-blue hover:text-orange"
        >
          <span> Sign {txType} transaction</span>
          <Icon
            type="ArrowRight"
            className="text-lg relative inline bottom-px"
          />
        </Link>
      ) : (
        <ReviewOptions appId={+appId} reference={r.PK} />
      )}
    </div>
  );
}

type Props = {
  appId: number;
  reference: string;
};
function ReviewOptions({ appId, reference }: Props) {
  const { showModal } = useModalContext();

  const review = (type: TxType) => () =>
    showModal(Proposer, { appId, type, reference });

  return (
    <div className="flex items-center gap-2 justify-start mt-6">
      <button
        type="button"
        className="min-w-[8rem] btn-orange px-2 py-1 text-sm"
        onClick={review("approve")}
      >
        approve
      </button>
      <button
        type="button"
        className="min-w-[8rem] btn-red  px-2 py-1 text-sm"
        onClick={review("reject")}
      >
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
