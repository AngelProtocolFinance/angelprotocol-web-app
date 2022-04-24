import { chainIDs } from "types/chainIDs";
import { CWContracts } from "types/server/contracts";
import {
  PageOptions,
  Proposal,
  VotesPageOptions,
} from "types/server/contracts";
import {
  ProposalGroupOptions,
  ProposalStatusOptions,
} from "pages/Admin/Proposals/Proposals";
import { ProposalMeta } from "pages/Admin/types";
import idParamToNumber from "helpers/idParamToNum";
import { admin_api } from "./admin";
import { member, proposal } from "./placeholders";
import useAdminContract from "./useAdminContract";

export function useMembers() {
  const { useMembersQuery } = admin_api;
  const { wallet, contract, isAdminSkip } = useAdminContract();
  const {
    data = [],
    isFetching,
    isLoading,
    isError,
  } = useMembersQuery(contract.members, {
    skip: isAdminSkip || wallet?.network.chainID === chainIDs.localterra,
  });
  return { members: data, isMembersLoading: isFetching || isLoading, isError };
}

export function useMember(customCWs?: CWContracts, skip = false) {
  const { useMemberQuery } = admin_api;
  const { wallet, contract, isAdminSkip } = useAdminContract(customCWs);
  const {
    data = member,
    isFetching,
    isLoading,
    isError,
  } = useMemberQuery(contract.member, {
    skip:
      skip ||
      isAdminSkip ||
      !wallet ||
      wallet.network.chainID === chainIDs.localterra,
  });
  return {
    member: data,
    isMemberLoading: isFetching || isLoading,
    isMemberError: isError,
  };
}

export const NUM_PROPOSALS_PER_PAGE = 5;
export function useFilteredProposals(
  group: ProposalGroupOptions,
  status: ProposalStatusOptions,
  pageNum: number
) {
  const { useProposalsQuery } = admin_api;
  const { wallet, contract, isAdminSkip } = useAdminContract();
  const { filteredProposals, isLoading, isError } = useProposalsQuery(
    contract.proposals(genPageOptions(pageNum, status, group)),
    {
      skip: isAdminSkip || wallet?.network.chainID === chainIDs.localterra,
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
export const VOTES_PER_PAGE = 15;
function genVoteListPageOptions(
  pollId: number,
  pageNum?: number
): VotesPageOptions {
  return {
    proposal_id: pollId,
    ...(pageNum && {
      limit: pageNum * VOTES_PER_PAGE,
    }),
  };
}

export function useProposal(pollId?: string | number) {
  const { useProposalQuery } = admin_api;
  const { wallet, contract, isAdminSkip } = useAdminContract();

  //process pollId path var which is not guaranteed to be a number castable string
  const numberPollId = idParamToNumber(pollId);
  const {
    data = proposal,
    isFetching,
    isLoading,
  } = useProposalQuery(contract.proposal(numberPollId), {
    skip:
      isAdminSkip ||
      numberPollId === 0 ||
      wallet?.network.chainID === chainIDs.localterra,
  });
  return { proposal: data, isProposalLoading: isFetching || isLoading };
}

export function useVoteList(pollId: number, pageNum?: number) {
  const { useVotesQuery } = admin_api;
  const { wallet, contract, isAdminSkip } = useAdminContract();
  const {
    data = [],
    isFetching,
    isLoading,
  } = useVotesQuery(
    contract.voteList(genVoteListPageOptions(pollId, pageNum)),
    {
      skip: isAdminSkip || wallet?.network.chainID === chainIDs.localterra,
    }
  );
  return { votes: data, isVoteListLoading: isFetching || isLoading };
}

export function useCW3Config() {
  const { useCw3ConfigQuery } = admin_api;
  const { wallet, contract, isAdminSkip } = useAdminContract();
  const { data, isFetching, isLoading, isError } = useCw3ConfigQuery(
    contract.cw3Config,
    {
      skip: isAdminSkip || wallet?.network.chainID === chainIDs.localterra,
    }
  );
  return {
    cw3Config: data,
    isCW3ConfigLoading: isFetching || isLoading,
    isError,
  };
}
