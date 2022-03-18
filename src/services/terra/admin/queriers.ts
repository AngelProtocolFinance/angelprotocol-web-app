import { chainIDs } from "constants/chainIDs";
import idParamToNumber from "helpers/idParamToNum";
import { admin_api } from "./admin";
import { member, proposal } from "./placeholders";
import { AdminQueryAddresses } from "./types";
import useAdminContract from "./useAdminContract";

export function useMembers(addresses: AdminQueryAddresses) {
  const { useMembersQuery } = admin_api;
  const { wallet, contract, isSkip } = useAdminContract(addresses);
  const {
    data = [],
    isFetching,
    isLoading,
  } = useMembersQuery(contract.members, {
    skip: isSkip || wallet?.network.chainID === chainIDs.localterra,
  });
  return { members: data, isMembersLoading: isFetching || isLoading };
}

export function useMember(addresses: AdminQueryAddresses) {
  const { useMemberQuery } = admin_api;
  const { wallet, contract, isSkip } = useAdminContract(addresses);
  const {
    data = member,
    isFetching,
    isLoading,
  } = useMemberQuery(contract.member, {
    skip: isSkip || !wallet || wallet.network.chainID === chainIDs.localterra,
  });
  return { member: data, isMemberLoading: isFetching || isLoading };
}

export function useProposals(addresses: AdminQueryAddresses) {
  const { useProposalsQuery } = admin_api;
  const { wallet, contract, isSkip } = useAdminContract(addresses);
  const {
    data = [],
    isFetching,
    isLoading,
  } = useProposalsQuery(contract.proposals, {
    skip: isSkip || wallet?.network.chainID === chainIDs.localterra,
  });
  return { proposals: data, isProposalsLoading: isFetching || isLoading };
}

export function useProposal(addresses: AdminQueryAddresses, pollId?: string) {
  const { useProposalQuery } = admin_api;
  const { wallet, contract, isSkip } = useAdminContract(addresses);

  //process pollId path var which is not guaranteed to be a number castable string
  const numberPollId = idParamToNumber(pollId);
  const {
    data = proposal,
    isFetching,
    isLoading,
  } = useProposalQuery(contract.proposal(numberPollId), {
    skip:
      isSkip ||
      numberPollId === 0 ||
      wallet?.network.chainID === chainIDs.localterra,
  });
  return { proposal: data, isProposalLoading: isFetching || isLoading };
}

export function useVoteList(addresses: AdminQueryAddresses, pollId: number) {
  const { useVotesQuery } = admin_api;
  const { wallet, contract, isSkip } = useAdminContract(addresses);
  const {
    data = [],
    isFetching,
    isLoading,
  } = useVotesQuery(contract.voteList(pollId), {
    skip: isSkip || wallet?.network.chainID === chainIDs.localterra,
  });
  return { votes: data, isVoteListLoading: isFetching || isLoading };
}
