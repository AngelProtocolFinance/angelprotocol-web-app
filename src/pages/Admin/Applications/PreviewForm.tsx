import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useNavigate } from "react-router-dom";
import { useProposal } from "services/terra/admin/queriers";
import Icon from "components/Icons/Icons";
import { useModalContext } from "components/ModalContext/ModalContext";
import { admin } from "constants/routes";
import useProposalDetails from "../Proposals/useProposalDetails";
import { CharityApplication } from "./types";
import useUpdateApplicationStatus from "./useUpdateApplication";

export default function PreviewForm({
  application: ap,
}: {
  application: CharityApplication;
}) {
  const wallet = useConnectedWallet();
  const { closeModal } = useModalContext();
  const { updateStatus } = useUpdateApplicationStatus();
  const { proposal, isProposalLoading } = useProposal(ap.poll_id);
  const { userVote } = useProposalDetails(proposal);
  const hasVoted = userVote === "yes";
  const disableAction = !!ap.poll_id || hasVoted || isProposalLoading;
  const navigate = useNavigate();

  const getTitle = (status: string) =>
    `${status} ${ap.CharityName} Application`;
  const getDescription = (status: string) =>
    `${status} ${ap.CharityName} by ${wallet?.walletAddress}`;

  const openPoll = () => {
    navigate(`admin/${admin.proposal}/${ap.poll_id}`);
    closeModal();
  };

  return (
    <div className="bg-white-grey grid gap-2 p-4 rounded-md w-full max-w-lg max-h-75vh overflow-y-auto">
      <h1 className="font-heading font-bold text-angel-grey uppercase">
        Review Application
      </h1>
      <p>
        <span className="text-angel-grey text-sm uppercase font-bold mb-1">
          Application ID:
        </span>
        <span className="font-normal text-sm text-angel-grey ml-2">
          {ap.PK}
        </span>
      </p>
      <Field label="Name" text={ap.CharityName} />
      <Field label="Contact Email" text={ap.CharityName_ContactEmail} />
      <Field
        label="Registration Date"
        text={new Date(ap.RegistrationDate).toDateString()}
      />
      <Field label="Wallet Address" text={ap.TerraWallet} />
      <Proof
        label="Endowment Agreement"
        verified={ap.EndowmentAgreementVerified}
        link={ap.EndowmentAgreement}
      />
      <Proof
        label="Proof of Employment"
        verified={ap.ProofOfEmploymentVerified}
        link={ap.ProofOfEmployment}
      />
      <Proof
        label="Proof of Identity"
        verified={ap.ProofOfIdentityVerified}
        link={ap.ProofOfIdentity}
      />
      {!!ap.poll_id && (
        <button
          className="`w-full bg-angel-blue text-center tracking-wider p-2 rounded-md mt-2 uppercase text-md text-white font-bold"
          onClick={openPoll}
        >
          Go to Poll
        </button>
      )}
      {!disableAction && (
        <div className="flex justify-center gap-4">
          <ActionButton
            title="Reject"
            actionColor="bg-failed-red"
            disabled={disableAction}
            onClick={() =>
              updateStatus({
                PK: ap.PK,
                status: "3",
                endowmentAddr: ap.TerraWallet, // replace with endowment address
                title: getTitle("Reject"),
                description: getDescription("Reject"),
              })
            }
          />
          <ActionButton
            title="Accept"
            actionColor="bg-bright-green"
            disabled={disableAction}
            onClick={() =>
              updateStatus({
                PK: ap.PK,
                status: "1",
                endowmentAddr: ap.TerraWallet, // replace with endowment address
                title: getTitle("Approve"),
                description: getDescription("Approve"),
              })
            }
          />
        </div>
      )}
    </div>
  );
}

function Field(props: { label: string; text: string }) {
  return (
    <div className="grid mb-3">
      <span className="ml-0.5 text-angel-grey text-md uppercase font-bold mb-1">
        {props.label}
      </span>
      <p
        className="p-3 text-angel-grey rounded-md bg-light-grey
         focus:outline-none"
      >
        {props.text}
      </p>
    </div>
  );
}

function Proof(props: { label: string; link: string; verified: boolean }) {
  return (
    <div className="grid mb-3">
      <span className="ml-0.5 text-angel-grey text-md uppercase font-bold mb-1">
        {props.label}
      </span>
      <a
        href={props.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`focus:outline-none flex justify-between items-center gap-3 p-3 text-angel-grey rounded-md bg-light-grey overflow-hidden`}
      >
        <span className="w-3/4 truncate">{props.link}</span>
        {props.verified ? (
          <Icon type="CheckCircle" className="text-bright-green" />
        ) : (
          <Icon type="Link" />
        )}
      </a>
    </div>
  );
}

interface ActionButtonProps extends React.HTMLProps<HTMLButtonElement> {
  actionColor: string;
}

function ActionButton({ actionColor, type, ...props }: ActionButtonProps) {
  return (
    <button
      {...props}
      className={`w-full tracking-wider ${actionColor} disabled:bg-grey-accent p-2 rounded-md mt-2 uppercase text-md text-white font-bold`}
      type="submit"
    >
      {props.title}
    </button>
  );
}
