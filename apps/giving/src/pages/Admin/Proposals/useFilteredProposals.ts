import { useProposalsQuery } from "@giving/services/juno/cw3";
import { ProposalMeta } from "../types";
import { PageOptions, Proposal } from "@giving/types/contracts";
import {
  ProposalGroupOptions,
  ProposalStatusOptions,
} from "slices/admin/types";
import { useAdminResources } from "../Guard";

export const NUM_PROPOSALS_PER_PAGE = 5;
export function useFilteredProposals(
  group: ProposalGroupOptions,
  status: ProposalStatusOptions,
  pageNum: number
) {
  const { cw3 } = useAdminResources();
  const { filteredProposals, isLoading, isError } = useProposalsQuery(
    {
      contract: cw3,
      ...genPageOptions(pageNum, status, group),
    },
    {
      selectFromResult: ({ data = [], isLoading, isFetching, isError }) => {
        function proposalFilter(proposal: Proposal): boolean {
          const proposalMeta = JSON.parse(
            proposal.meta || "{}"
          ) as ProposalMeta;

          const isBelongToGroup =
            group === "all" || new RegExp(group).test(proposalMeta.type);

          const isCorrectStatus =
            status === "all" || proposal.status === status;

          return isBelongToGroup && isCorrectStatus;
        }

        return {
          filteredProposals:
            status === "all" && group === "all"
              ? data
              : data.filter(proposalFilter),
          isLoading: isLoading || isFetching,
          isError,
        };
      },
    }
  );
  return {
    filteredProposals,
    isFilteredProposalsLoading: isLoading,
    isFilteredProposalsFailed: isError,
  };
}

function genPageOptions(
  pageNum: number,
  status: ProposalStatusOptions,
  group: ProposalGroupOptions
): PageOptions {
  if (status === "all" && group === "all") {
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
