import React, { ReactNode } from "react";
import { ProposalDetails, ProposalMeta } from "pages/Admin/types";
import { Tags } from "slices/transaction/types";
import {
  adminTags,
  endowmentTags,
  indexfundTags,
  multicallTags,
  registrarTags,
  terraTags,
} from "services/terra/tags";
import { terra } from "services/terra/terra";
import useProposalExecutor from "components/Transactors/AdminExecuter/useProposalExecutor";
import useAdminVoter from "components/Transactors/AdminVoter/useAdminVoter";

export default function PollAction(props: ProposalDetails) {
  const showAdminVoter = useAdminVoter(props.numId);

  const showAdminExecuter = useProposalExecutor({
    proposal_id: props.numId,
    tagPayloads: getTagPayloads(props.meta),
  });

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
  const tagsToInvalidate: Tags = [
    //basic tags to invalidate
    { type: terraTags.admin, id: adminTags.proposal },
    { type: terraTags.admin, id: adminTags.proposals },
  ];
  if (!proposalMeta) {
    return [terra.util.invalidateTags(tagsToInvalidate)];
  }
  const parsedProposalMeta: ProposalMeta = JSON.parse(proposalMeta);
  switch (parsedProposalMeta.type) {
    case "indexfund-alliance-edit":
      tagsToInvalidate.push({
        type: terraTags.indexfund,
        id: indexfundTags.alliance_members,
      });
      break;
    case "indexfund-remove-fund":
    case "indexfund-create-fund":
    case "indexfund-update-fund-members": //fund members shown via selecFromResult (fund_list)
      tagsToInvalidate.push({
        type: terraTags.indexfund,
        id: indexfundTags.fund_list,
      });
      break;

    case "indexfund-config-update":
    case "indexfund-owner-update":
      tagsToInvalidate.push({
        type: terraTags.indexfund,
        id: indexfundTags.config,
      });
      break;

    case "admin-group-update-members":
      tagsToInvalidate.push({
        type: terraTags.admin,
        id: adminTags.members,
      });
      break;

    case "admin-group-fund-transfer":
      tagsToInvalidate.push({
        type: terraTags.multicall,
        id: multicallTags.terraBalances,
      });
      break;

    case "endowment-update-status":
      tagsToInvalidate.push({
        type: terraTags.registrar,
        id: registrarTags.endowments, //via selectFromResult (endowments), TODO: convert to {endowment:{}} query
      });
      break;

    case "endowment-withdraw":
      tagsToInvalidate.push(
        {
          type: terraTags.multicall,
          id: multicallTags.endowmentBalance,
        },
        //edge: user transfers to CW20 or Native to his connected wallet
        {
          type: terraTags.multicall,
          id: multicallTags.terraBalances,
        }
      );
      break;

    case "endowment-update-profile":
      tagsToInvalidate.push({
        type: terraTags.endowment,
        id: endowmentTags.profile,
      });
      break;

    case "registrar-update-owner":
    case "registrar-update-config":
      tagsToInvalidate.push({
        type: terraTags.registrar,
        id: registrarTags.config,
      });
      break;

    default:
      return [terra.util.invalidateTags(tagsToInvalidate)];
  }
  return [terra.util.invalidateTags(tagsToInvalidate)];
}
