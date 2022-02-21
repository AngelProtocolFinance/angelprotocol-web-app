import { chainIDs } from "constants/chainIDs";
import { useAdminContract } from "../contracts";
import { admin_api } from "./admin";
import { member, proposal } from "./placeholders";

export function useMembers() {
  const { useMembersQuery } = admin_api;
  const { wallet, contract } = useAdminContract();
  const {
    data = [],
    isFetching,
    isLoading,
  } = useMembersQuery(contract.members, {
    skip: wallet?.network.chainID === chainIDs.localterra,
  });
  return { members: data, isMembersLoading: isFetching || isLoading };
}

export function useMember() {
  const { useMemberQuery } = admin_api;
  const { wallet, contract } = useAdminContract();
  const {
    data = member,
    isFetching,
    isLoading,
  } = useMemberQuery(contract.member, {
    skip: !wallet || wallet.network.chainID === chainIDs.localterra,
  });
  return { member: data, isMemberLoading: isFetching || isLoading };
}

export function useProposals() {
  const { useProposalsQuery } = admin_api;
  const { wallet, contract } = useAdminContract();
  const {
    data = [],
    isFetching,
    isLoading,
  } = useProposalsQuery(contract.proposals, {
    skip: wallet?.network.chainID === chainIDs.localterra,
  });
  return { proposals: data, isProposalsLoading: isFetching || isLoading };
}

export function useProposal(pollId: string) {
  const { useProposalQuery } = admin_api;
  const { wallet, contract } = useAdminContract();

  //process pollId path var which is not guaranteed to be a number castable string
  const numberPollId = isNaN(pollId as unknown as number)
    ? 0
    : Math.floor(+pollId);

  const {
    data = proposal,
    isFetching,
    isLoading,
  } = useProposalQuery(contract.proposal(numberPollId), {
    skip: numberPollId === 0 || wallet?.network.chainID === chainIDs.localterra,
  });
  return { proposal: data, isProposalLoading: isFetching || isLoading };
}

export function useVoteList(pollId: number) {
  const { useVotesQuery } = admin_api;
  const { wallet, contract } = useAdminContract();
  const {
    data = [],
    isFetching,
    isLoading,
  } = useVotesQuery(contract.voteList(pollId), {
    skip: wallet?.network.chainID === chainIDs.localterra,
  });
  return { votes: data, isVoteListLoading: isFetching || isLoading };
}

export function useVoter() {
  const { useVoterQuery } = admin_api;
  const { wallet, contract } = useAdminContract();
  const {
    data = member,
    isFetching,
    isLoading,
  } = useVoterQuery(contract.voter, {
    skip: !wallet || wallet?.network.chainID === chainIDs.localterra,
  });
  return { voter: data, isVoterLoading: isFetching || isLoading };
}
