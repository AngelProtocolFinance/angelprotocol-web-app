import { Dialog } from "@headlessui/react";
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  PropsWithChildren,
} from "react";
import { useNavigate } from "react-router-dom";
import { CharityApplication, FileObject } from "types/server/aws";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import { adminRoutes } from "constants/routes";
import useProposeStatusChange from "./useProposeStatusChange";

export default function Application(props: CharityApplication) {
  const { updateStatus } = useProposeStatusChange(props);
  const { closeModal } = useModalContext();
  const navigate = useNavigate();
  const email = props.CharityName_ContactEmail!.split("_")[1];
  function goToPoll() {
    navigate(adminRoutes.proposal + `/${props.poll_id}`);
    closeModal();
  }

  return (
    <Dialog.Panel
      className="fixed-center z-20 bg-white-grey text-angel-grey grid p-4 rounded-md w-full max-w-sm max-h-[75vh] overflow-y-auto"
      data-testid="application-preview"
    >
      <h3 className="text-xl font-semibold">{props.CharityName}</h3>
      <p className="text-sm mb-6 flex items-center gap-1">
        <Url href={props.Website} className="hover:text-angel-blue">
          <Icon type="Globe" size={16} />
        </Url>
        <span>{email}</span>
      </p>

      <Label>Registration Date</Label>
      <span>{new Date(props.RegistrationDate).toLocaleDateString()}</span>

      <Label classes="mt-4 mb-1">Documents</Label>
      <Documents label="Proof of Identity" docs={[props.ProofOfIdentity]} />
      <Documents
        label="Proof of Registration"
        docs={[props.ProofOfRegistration]}
      />
      <Documents label="Financial Statement" docs={props.FinancialStatements} />
      <Documents
        label="Audited Financial Report"
        docs={props.AuditedFinancialReports}
      />

      <div className="grid grid-cols-2 gap-1 mt-4">
        <Button
          onClick={() => updateStatus(1)}
          className="text-emerald-500 hover:bg-emerald-500/20"
          // disabled={props.poll_id !== undefined}
        >
          Approve
        </Button>
        <Button
          onClick={() => updateStatus(3)}
          className="text-rose-500 hover:bg-rose-500/20"
          // disabled={props.poll_id !== undefined}
        >
          Reject
        </Button>
      </div>
      {props.poll_id && (
        <button
          onClick={goToPoll}
          className="text-sky-600 hover:text-sky-400 uppercase text-sm mt-4 flex items-center justify-end"
        >
          <span>go to poll</span>
          <Icon type="Forward" size={12} />
        </button>
      )}
    </Dialog.Panel>
  );
}
/**
 * 
 * @param props   {(props.poll_id && (
        <Link
          to={adminRoutes.proposal + `/${props.poll_id}`}
          className="uppercase font-heading font-bold text-sm hover:text-angel-blue"
        >
          VOTE
        </Link>
      )) || (
 * @returns 
 */

function Label(props: PropsWithChildren<{ classes?: string }>) {
  return (
    <span
      {...props}
      className={`text-xs text-angel-grey uppercase ${props.classes || ""}`}
    />
  );
}

function Documents({ docs, label }: { docs: FileObject[]; label: string }) {
  return (
    <>
      {docs.map((doc, i) => (
        <Url
          href={doc.publicUrl}
          key={i}
          className="font-heading uppercase text-sm flex items-center gap-1 text-sky-900 hover:text-sky-500 mb-1"
        >
          <Icon type="ExternalLink" />
          <span>
            {label} {docs.length <= 1 ? "" : i + 1}
          </span>
        </Url>
      ))}
    </>
  );
}

function Url(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );
}

function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`${
        props.className || ""
      } uppercase font-heading text-sm font-bold border py-2 border-zinc-800/30 rounded-sm disabled:bg-zinc-200 disabled:text-zinc-400`}
    />
  );
}
