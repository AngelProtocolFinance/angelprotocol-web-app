import React, { ReactNode, useMemo } from "react";
import { ProposalMeta } from "pages/Admin/types";
import { ProposalDetails } from "services/types";
import { TagPayload } from "types/third-party/redux";
import { invalidateJunoTags } from "services/juno";
import { defaultProposalTags } from "services/juno/tags";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import CW3 from "contracts/CW3";
import useTxSender from "hooks/useTxSender";
import { getTagPayloads } from "helpers/admin";
import { useAdminResources } from "../Guard";
import Voter from "./Voter";

export default function PollAction(props: ProposalDetails) {
  const { wallet } = useGetWallet();
  const sendTx = useTxSender();
  const { multisig, propMeta } = useAdminResources();
  const { showModal } = useModalContext();

  async function executeProposal() {
    const contract = new CW3(wallet, multisig);
    const execMsg = contract.createExecProposalMsg(props.id);

    await sendTx({
      content: { type: "cosmos", val: [execMsg] },
      isAuthorized: propMeta.isAuthorized,
      tagPayloads: extractTagFromMeta(props.meta),
    });
  }

  const userVote = useMemo(
    () => props.votes.find((vote) => vote.voter === wallet?.address),
    [props.votes, wallet?.address]
  );

  const EXED = props.status === "executed";
  const EX = props.status === "pending";
  const V = userVote !== undefined;

  let node: ReactNode = null;
  //poll is executed
  if (EXED) {
    node = <Text>poll has ended</Text>;
    //voting period ended and poll is passed waiting to be executed
  } else if (EX) {
    node = node = <Button onClick={executeProposal}>Execute Poll</Button>;
    //voting period ended, but poll is not passed
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
