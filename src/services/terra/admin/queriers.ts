import { chainIDs } from "constants/chainIDs";
import { useAdminContract } from "../contracts";
import { admin_api } from "./admin";
import { member } from "./placeholders";

export function useMembers() {
  const { useMembersQuery } = admin_api;
  const { wallet, contract } = useAdminContract();
  const { data = [] } = useMembersQuery(contract.members, {
    skip: wallet?.network.chainID === chainIDs.localterra,
  });
  return data;
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
