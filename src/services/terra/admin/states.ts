import { CWContracts } from "@types-server/contracts";
import { LOCAL_TERRA } from "../constants";
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
      skip || isAdminSkip || !wallet || wallet.network.chainID === LOCAL_TERRA,
  });
  return { member: data, isMemberLoading: isFetching || isLoading };
}
