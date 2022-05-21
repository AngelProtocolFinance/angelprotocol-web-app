import { CWContracts } from "types/server/contracts";
import { chainIDs } from "constants/chainIDs";
import { admin_api } from "./admin";
import { member } from "./placeholders";
import useAdminContract from "./useAdminContract";

export function useMemberState(customCWs?: CWContracts, skip = false) {
  const { wallet, contract, isAdminSkip } = useAdminContract(customCWs);
  const {
    data = member,
    isFetching,
    isLoading,
  } = admin_api.endpoints.member.useQueryState(contract.member, {
    skip:
      skip ||
      isAdminSkip ||
      !wallet ||
      wallet.network.chainID === chainIDs.terra_local,
  });
  return { member: data, isMemberLoading: isFetching || isLoading };
}
