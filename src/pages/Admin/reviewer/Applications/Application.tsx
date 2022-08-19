import { Dialog } from "@headlessui/react";
import { ButtonHTMLAttributes, HTMLAttributes, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { CharityApplication } from "types/server/aws";
import { AP_ID, REVIEWER_ID } from "services/juno/custom";
import { adminRoutes, appRoutes } from "constants/routes";

export default function Application(props: CharityApplication) {
  const email = props.CharityName_ContactEmail!.split("_")[1];
  return (
    <Dialog.Panel
      className="fixed-center z-20 bg-white-grey grid gap-2 p-4 rounded-md w-full max-w-lg max-h-[75vh] overflow-y-auto"
      data-testid="preview-form"
    >
      <p>
        <span className="text-angel-grey text-sm uppercase font-bold mb-1">
          Application ID:
        </span>
        <span className="font-normal text-sm text-angel-grey ml-2">
          {props.PK}
        </span>
      </p>
      <Field label="Name">{props.CharityName}</Field>
      <Field label="Contact Email">{email}</Field>
      <Field label="Registration Date">
        {new Date(props.RegistrationDate).toDateString()}
      </Field>
      {/* <Proof
        label="Endowment Agreement"
        verified={props.EndowmentAgreementVerified}
        link={props.EndowmentAgreement}
      />
      <Proof
        label="Proof of Employment"
        verified={props.ProofOfEmploymentVerified}
        link={props.ProofOfEmployment}
      />
      <Proof
        label="Proof of Identity"
        verified={props.ProofOfIdentityVerified}
        link={props.ProofOfIdentity}
      /> */}

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
      <span className="ml-0.5 text-angel-grey text-md uppercase font-bold mb-1">
        {props.label}
      </span>
      <span>{props.children}</span>
    </div>
  );
}

function Document(props: PropsWithChildren<{ label: string }>) {
  return (
    <div className="grid mb-3">
      <span className="ml-0.5 text-angel-grey text-md uppercase font-bold mb-1">
        {props.label}
      </span>
      <a>{props.children}</a>
    </div>
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
