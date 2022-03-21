import { chainIDs } from "constants/chainIDs";
import { CWContracts } from "contracts/Admin";
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

export function useProposals() {
  const { useProposalsQuery } = admin_api;
  const { wallet, contract, isAdminSkip } = useAdminContract();
  const {
    data = [],
    isFetching,
    isLoading,
  } = useProposalsQuery(contract.proposals, {
    skip: isAdminSkip || wallet?.network.chainID === chainIDs.localterra,
  });

  return { proposals: data, isProposalsLoading: isFetching || isLoading };
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
