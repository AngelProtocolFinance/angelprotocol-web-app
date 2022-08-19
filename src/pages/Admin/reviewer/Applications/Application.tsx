import { Dialog } from "@headlessui/react";
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  PropsWithChildren,
} from "react";
import { CharityApplication, FileObject } from "types/server/aws";
import { AP_ID, REVIEWER_ID } from "services/juno/custom";
import { adminRoutes, appRoutes } from "constants/routes";

/**
 * 

  AuditedFinancialReportsVerified: boolean;
  CharityName: string;
  CharityName_ContactEmail?: string;
  AuditedFinancialReports: FileObject[];
  FinancialStatements: FileObject[];
  ProofOfIdentity: FileObject;
  ProofOfRegistration: FileObject;
  FinancialStatementsVerified: boolean;

  ProofOfIdentityVerified: boolean;

  ProofOfRegistrationVerified: boolean;
  RegistrationDate: string;
  RegistrationStatus: RegistrationStatus;
  SK: "Registration";
  Tier?: EndowmentTierNum;
  UN_SDG: number;
  Website: string;

 */

export default function Application(props: CharityApplication) {
  const email = props.CharityName_ContactEmail!.split("_")[1];
  return (
    <Dialog.Panel
      className="fixed-center z-20 bg-white-grey text-angel-grey grid p-4 rounded-md w-full max-w-lg max-h-[75vh] overflow-y-auto"
      data-testid="preview-form"
    >
      <Field label="Registration date">
        {new Date(props.RegistrationDate).toLocaleDateString()}
      </Field>
      <h3 className="text-2xl font-bold text-angel-grey mt-4 text-center">
        {props.CharityName}
      </h3>
      <p className="text-sm mb-6 text-center">{email}</p>
      <span className="text-angel-grey uppercase font-heading text-xs font-semibold mb-2">
        Documents
      </span>
      <div className="grid grid-cols-3 gap-1">
        <Documents label="Proof of Identity" docs={[props.ProofOfIdentity]} />
        <Documents
          label="Proof of Registration"
          docs={[props.ProofOfRegistration]}
        />
        <Documents
          label="Financial Statement"
          docs={props.FinancialStatements}
        />
        <Documents
          label="Audited Financial Report"
          docs={props.AuditedFinancialReports}
        />
      </div>

      {/* <Link
        className="`w-full bg-angel-blue text-center tracking-wider p-2 rounded-md mt-2 uppercase text-md text-white font-bold"
        to={`${appRoutes.admin}/${REVIEWER_ID}/${adminRoutes.proposal}/${ap.poll_id}`}
      >
        Go to Poll
      </Link> */}
      <div className="flex justify-center gap-4">
        {/* <ActionButton
          title="Reject"
          actionColor="bg-failed-red"
          onClick={() =>
            updateStatus({
              PK: ap.PK,
              status: "3",
              id: 0, // TODO: replace with endowment address
              title: getTitle("Reject"),
              description: getDescription("Reject"),
            })
          }
        />
        <ActionButton
          title="Accept"
          actionColor="bg-bright-green"
          onClick={() =>
            updateStatus({
              PK: ap.PK,
              status: "1",
              id: 0, // TODO: replace with endowment address
              title: getTitle("Approve"),
              description: getDescription("Approve"),
            })
          }
        /> */}
      </div>
    </Dialog.Panel>
  );
}

function Field(props: PropsWithChildren<{ label: string }>) {
  return (
    <div className="grid mb-3">
      <span className="text-angel-grey uppercase font-heading text-xs font-semibold">
        {props.label}
      </span>
      <span>{props.children}</span>
    </div>
  );
}

function Documents({ docs, label }: { docs: FileObject[]; label: string }) {
  return (
    <>
      {docs.map((doc, i) => (
        <Url
          href={doc.publicUrl}
          key={i}
          className="p-3 border text-sm text-center hover:bg-angel-blue/10 hover:text-angel-blue hover:border-angel-blue/10"
        >
          {label} {docs.length <= 1 ? "" : i + 1}
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

// function (props: ButtonHTMLAttributes<HTMLButtonElement> & {classes?:string}) {
//   return (
//     <button
//       {...props}
//       className={`w-full tracking-wider ${actionColor} disabled:bg-grey-accent p-2 rounded-md mt-2 uppercase text-md text-white font-bold`}
//       type="submit"
//     >
//       {props.title}
//     </button>
//   );
// }
