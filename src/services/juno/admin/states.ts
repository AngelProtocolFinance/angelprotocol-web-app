import { CWContracts } from "types/server/contracts";
import { admin_api } from "./admin";
import { member } from "./placeholders";
import useAdminContract from "./useAdminContract";

export function useMemberState(customCWs?: CWContracts, skip = false) {
  const { contract, isAdminSkip, walletAddr } = useAdminContract(customCWs);
  const {
    data = member,
    isFetching,
    isLoading,
  } = admin_api.endpoints.member.useQueryState(contract.member, {
    skip: skip || isAdminSkip || !walletAddr,
  });
  return { member: data, isMemberLoading: isFetching || isLoading };
}
