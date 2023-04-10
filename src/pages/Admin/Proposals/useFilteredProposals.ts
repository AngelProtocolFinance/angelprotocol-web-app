import { ProposalMeta } from "../types";
import {
  ProposalGroupOptions,
  ProposalStatusOptions,
} from "slices/admin/types";
import { PageOptions, Proposal } from "types/contracts";
import { useContractQuery } from "services/juno";
import { useAdminResources } from "../Guard";

export const NUM_PROPOSALS_PER_PAGE = 5;
export function useFilteredProposals(
  group: ProposalGroupOptions,
  status: ProposalStatusOptions,
  pageNum: number
) {
  const { multisig } = useAdminResources();
  const {
    data: proposals = [],
    isLoading,
    isError,
  } = useContractQuery("multisig.proposals", {
    multisig,
    ...genPageOptions(pageNum, group),
  });

  function proposalFilter(proposal: Proposal): boolean {
    const proposalMeta = JSON.parse(proposal.meta || "{}") as ProposalMeta;

    const isBelongToGroup =
      group === "all" || new RegExp(group).test(proposalMeta.type);

    const isCorrectStatus = proposal.status === status;

    return isBelongToGroup && isCorrectStatus;
  }

  return {
    filteredProposals:
      group === "all" ? proposals : proposals.filter(proposalFilter),
    isFilteredProposalsLoading: isLoading,
    isFilteredProposalsFailed: isError,
  };
}

function genPageOptions(
  pageNum: number,
  group: ProposalGroupOptions
): PageOptions {
  if (group === "all") {
    return {
      //e.g 10 first, then 20
      limit: NUM_PROPOSALS_PER_PAGE * pageNum,
    };
  } else {
    //get all proposals when there's filter applied
    //since web-app doesn't know what page a particular
    //proposal falls into
    return { limit: 10_000 };
  }
}
