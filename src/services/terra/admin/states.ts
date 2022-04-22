import { chainIDs } from "types/chainIDs";
import { CWContracts } from "types/contracts/admin";
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
      wallet.network.chainID === chainIDs.localterra,
  });
  return { member: data, isMemberLoading: isFetching || isLoading };
}
