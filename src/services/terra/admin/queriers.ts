import { chainIDs } from "constants/chainIDs";
import idParamToNumber from "helpers/idParamToNum";
import { admin_api } from "./admin";
import { member, proposal } from "./placeholders";
import { CWContracts } from "contracts/Admin";
import useAdminContract from "./useAdminContract";

export function useMembers(cws: CWContracts) {
  const { useMembersQuery } = admin_api;
  const { wallet, contract, isAdminSkip } = useAdminContract(cws);
  const {
    data = [],
    isFetching,
    isLoading,
  } = useMembersQuery(contract.members, {
    skip: isAdminSkip || wallet?.network.chainID === chainIDs.localterra,
  });
  return { members: data, isMembersLoading: isFetching || isLoading };
}

export function useMember(cws: CWContracts, skip = false) {
  const { useMemberQuery } = admin_api;
  const { wallet, contract, isAdminSkip } = useAdminContract(cws);
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

export function useProposals(cws: CWContracts) {
  const { useProposalsQuery } = admin_api;
  const { wallet, contract, isAdminSkip } = useAdminContract(cws);
  const {
    data = [],
    isFetching,
    isLoading,
  } = useProposalsQuery(contract.proposals, {
    skip: isAdminSkip || wallet?.network.chainID === chainIDs.localterra,
  });

  console.log(contract);

  return { proposals: data, isProposalsLoading: isFetching || isLoading };
}

export function useProposal(cws: CWContracts, pollId?: string) {
  const { useProposalQuery } = admin_api;
  const { wallet, contract, isAdminSkip } = useAdminContract(cws);

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

export function useVoteList(cws: CWContracts, pollId: number) {
  const { useVotesQuery } = admin_api;
  const { wallet, contract, isAdminSkip } = useAdminContract(cws);
  const {
    data = [],
    isFetching,
    isLoading,
  } = useVotesQuery(contract.voteList(pollId), {
    skip: isAdminSkip || wallet?.network.chainID === chainIDs.localterra,
  });
  return { votes: data, isVoteListLoading: isFetching || isLoading };
}
