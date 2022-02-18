import { chainIDs } from "constants/chainIDs";
import { useAdminContract } from "../contracts";
import { admin_api } from "./admin";
import { member } from "./placeholders";

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
  return { proposals: data, isMemberLoading: isFetching || isLoading };
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
