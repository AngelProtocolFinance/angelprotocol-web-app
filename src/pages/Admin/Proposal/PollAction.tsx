import React, { ReactNode, useMemo } from "react";
import { ProposalMeta } from "pages/Admin/types";
import { ProposalDetails } from "services/types";
import { SimulContractTx } from "types/evm";
import { TagPayload } from "types/third-party/redux";
import { invalidateJunoTags, useLatestBlockQuery } from "services/juno";
import { defaultProposalTags } from "services/juno/tags";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import { APTeamMultiSig, ApplicationsMultiSig } from "contracts/evm";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads } from "helpers/admin";
import { WalletDisconnectedError } from "errors/errors";
import { useAdminResources } from "../Guard";
import Voter from "./Voter";

const applicationsMultiSigProxy = "0x1edC050B5d84cbB0cA0b56356f3F7307efcd50Fb";
const apTeamMultiSigProxy = "0xC26Ac43b14ebCbff5029792052aF3e4DF3233902";

export default function PollAction(props: ProposalDetails) {
  const { data: latestBlock = "0" } = useLatestBlockQuery(null);
  const { wallet } = useGetWallet();
  const sendTx = useTxSender();
  const { propMeta } = useAdminResources();
  const { showModal } = useModalContext();
  const { handleError } = useErrorContext();

  async function executeProposal() {
    if (!wallet) {
      return handleError(new WalletDisconnectedError());
    }

    const msg: SimulContractTx =
      props.proposal_type === "application"
        ? {
            from: wallet.address,
            to: applicationsMultiSigProxy,
            data: ApplicationsMultiSig.executeTransaction.encode(props.id),
          }
        : {
            from: wallet.address,
            to: apTeamMultiSigProxy,
            data: APTeamMultiSig.executeTransaction.encode(props.id),
          };

    const log =
      props.proposal_type === "application"
        ? ApplicationsMultiSig.executeTransaction.processLogs
        : APTeamMultiSig.executeTransaction.processLogs;

    await sendTx({
      content: { type: "evm", val: msg, log },
      isAuthorized: propMeta.isAuthorized,
      tagPayloads: extractTagFromMeta(props.meta),
    });
  }

  const isExpired =
    "at_time" in props.expires
      ? new Date() > new Date(props.expires.at_time / 1e6)
      : +latestBlock > props.expires.at_height;

  const userVote = useMemo(
    () => props.votes.find((vote) => vote.voter === wallet?.address),
    [props.votes, wallet?.address]
  );

  const EXED = props.status === "executed";
  const EX =
    props.status === "passed" &&
    /** proposal has embedded execute message*/ props.msgs &&
    props.msgs.length > 0;
  const VE = props.status !== "open" || isExpired;
  const V = userVote !== undefined;

  let node: ReactNode = null;
  //poll is executed
  if (EXED) {
    node = <Text>poll has ended</Text>;
    //voting period ended and poll is passed waiting to be executed
  } else if (EX) {
    node = node = <Button onClick={executeProposal}>Execute Poll</Button>;
    //voting period ended, but poll is not passed
  } else if (VE) {
    node = <Text>voting period has ended</Text>;
  } else {
    //voting ongoing
    if (V) {
      node = <Text>you voted {userVote.vote}</Text>;
    } else {
      node = (
        <Button
          onClick={() => {
            showModal(Voter, {
              type: props.proposal_type,
              proposalId: props.id,
              existingReason: props.description,
            });
          }}
        >
          Vote
        </Button>
      );
    }
  }
  return <>{node}</>;
}

function Text(props: { children: ReactNode }) {
  return <p className="uppercase text-sm">{props.children}</p>;
}

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className="text-sm px-6 py-1.5 btn-orange" />;
}

function extractTagFromMeta(
  proposalMeta: ProposalDetails["meta"]
): TagPayload[] {
  if (!proposalMeta) {
    return [invalidateJunoTags(defaultProposalTags)];
  }
  const parsedProposalMeta: ProposalMeta = JSON.parse(proposalMeta);
  return getTagPayloads(parsedProposalMeta.type);
}
