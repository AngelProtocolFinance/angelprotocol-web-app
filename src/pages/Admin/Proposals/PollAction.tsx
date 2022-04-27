import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import React, { ReactNode } from "react";
import {
  admin,
  endowment,
  indexfund,
  multicall,
  registrar,
  tags,
  user,
} from "services/terra/tags";
import { terra } from "services/terra/terra";
import useProposalExecutor from "components/Transactors/AdminExecuter/useProposalExecutor";
import useAdminVoter from "components/Transactors/AdminVoter/useAdminVoter";
import { proposalTypes } from "constants/routes";
import { ProposalMeta } from "../types";
import { ProposalDetails } from "./useProposalDetails";

export default function PollAction(props: ProposalDetails) {
  const showAdminVoter = useAdminVoter(props.numId);

  const showAdminExecuter = useProposalExecutor(
    props.numId,
    getTagPayloads(props.meta)
  );

  const EXED = props.isExecuted;
  const EX = props.isExecutable;
  const VE = props.isVoteEnded;
  const V = props.userVote !== undefined;

  let node: ReactNode = null;
  //poll is executed
  if (EXED) {
    node = <Text>poll has ended</Text>;
    //voting period ended and poll is passed waiting to be executed
  } else if (EX) {
    node = node = <Button onClick={showAdminExecuter}>Execute Poll</Button>;
    //voting period ended, but poll is not passed
  } else if (VE) {
    node = <Text>voting period has ended</Text>;
  } else {
    //voting ongoing
    if (V) {
      node = <Text>you voted {props.userVote}</Text>;
    } else {
      node = <Button onClick={showAdminVoter}>Vote</Button>;
    }
  }
  return <>{node}</>;
}

function Text(props: { children: ReactNode }) {
  return <p className="uppercase text-sm">{props.children}</p>;
}

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="text-xs font-bold uppercase font-heading px-6 pt-1.5 pb-1 rounded-md bg-blue-accent hover:bg-angel-blue border-2 border-white/30"
    />
  );
}
/** 
 *   index = "",
  //registrar
  registrar_updateConfig = "registrar-update-config",
  registrar_updateOwner = "registrar-update-owner",
*/

function getTagPayloads(proposalMeta: ProposalDetails["meta"]) {
  const tagsToInvalidate: TagDescription<tags>[] = [
    //basic tags to invalidate
    { type: tags.admin, id: admin.proposal },
    { type: tags.admin, id: admin.proposals },
  ];
  if (!proposalMeta) {
    return [terra.util.invalidateTags(tagsToInvalidate)];
  }
  const parsedProposalMeta: ProposalMeta = JSON.parse(proposalMeta);
  switch (parsedProposalMeta.type) {
    case proposalTypes.indexFund_allianceEdits:
      tagsToInvalidate.push({
        type: tags.indexfund,
        id: indexfund.alliance_members,
      });
      break;
    case proposalTypes.indexFund_removeFund:
    case proposalTypes.indexFund_createFund:
    case proposalTypes.indexFund_updateFundMembers: //fund members shown via selecFromResult (fund_list)
      tagsToInvalidate.push({
        type: tags.indexfund,
        id: indexfund.fund_list,
      });
      break;

    case proposalTypes.indexFund_configUpdate:
    case proposalTypes.indexFund_ownerUpdate:
      tagsToInvalidate.push({
        type: tags.indexfund,
        id: indexfund.config,
      });
      break;

    case proposalTypes.adminGroup_updateMembers:
      tagsToInvalidate.push({
        type: tags.admin,
        id: admin.members,
      });
      break;

    case proposalTypes.adminGroup_fundTransfer:
      tagsToInvalidate.push(
        {
          type: tags.user,
          id: user.terra_balance,
        },
        {
          type: tags.user,
          id: user.halo_balance,
        }
      );
      break;

    case proposalTypes.endowment_updateStatus:
      tagsToInvalidate.push({
        type: tags.registrar,
        id: registrar.endowments, //via selectFromResult (endowments), TODO: convert to {endowment:{}} query
      });
      break;

    case proposalTypes.endowment_withdraw:
      tagsToInvalidate.push(
        {
          type: tags.multicall,
          id: multicall.endowmentBalance,
        },
        //edge: user transfers to CW20 or Native to his connected wallet
        {
          type: tags.user,
          id: user.halo_balance,
        },
        {
          type: tags.user,
          id: user.terra_balance,
        }
      );
      break;

    case proposalTypes.endowment_updateProfile:
      tagsToInvalidate.push({ type: tags.endowment, id: endowment.profile });
      break;

    case proposalTypes.registrar_updateOwner:
    case proposalTypes.registrar_updateConfig:
      tagsToInvalidate.push({ type: tags.registrar, id: registrar.config });
      break;

    default:
      return [terra.util.invalidateTags(tagsToInvalidate)];
  }
  return [terra.util.invalidateTags(tagsToInvalidate)];
}
