import { chainIDs } from "constants/chainIDs";
import { CWContracts, PageOptions } from "contracts/Admin";
import idParamToNumber from "helpers/idParamToNum";
import { ProposalStatusOptions } from "pages/Admin/Proposals/Proposals";
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
  } = useMembersQuery(contract.members, {
    skip: isAdminSkip || wallet?.network.chainID === chainIDs.localterra,
  });
  return { members: data, isMembersLoading: isFetching || isLoading };
}

export function useMember(customCWs?: CWContracts, skip = false) {
  const { useMemberQuery } = admin_api;
  const { wallet, contract, isAdminSkip } = useAdminContract(customCWs);
  const {
    data = member,
    isFetching,
    isLoading,
  } = useMemberQuery(contract.member, {
    skip:
      skip ||
      isAdminSkip ||
      !wallet ||
      wallet.network.chainID === chainIDs.localterra,
  });
  return { member: data, isMemberLoading: isFetching || isLoading };
}

export const NUM_PROPOSALS_PER_PAGE = 5;
export function useFilteredProposals(
  status: ProposalStatusOptions,
  pageNum: number
) {
  const { useProposalsQuery } = admin_api;
  const { wallet, contract, isAdminSkip } = useAdminContract();
  const { filteredProposals, isLoading, isError } = useProposalsQuery(
    contract.proposals(genPageOptions(pageNum, status)),
    {
      skip: isAdminSkip || wallet?.network.chainID === chainIDs.localterra,
      selectFromResult: ({ data = [], isLoading, isFetching, isError }) => ({
        filteredProposals:
          status === "all"
            ? data
            : data.filter((proposal) => proposal.status === status),
        isLoading: isLoading || isFetching,
        isError,
      }),
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
  status: ProposalStatusOptions
): PageOptions {
  if (status === "all") {
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

export function useProposal(pollId?: string) {
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

export function useVoteList(pollId: number) {
  const { useVotesQuery } = admin_api;
  const { wallet, contract, isAdminSkip } = useAdminContract();
  const {
    data = [],
    isFetching,
    isLoading,
  } = useVotesQuery(contract.voteList(pollId), {
    skip: isAdminSkip || wallet?.network.chainID === chainIDs.localterra,
  });
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
