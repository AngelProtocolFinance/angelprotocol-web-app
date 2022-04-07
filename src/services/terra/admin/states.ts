import { chainIDs } from "constants/chainIDs";
import { CWContracts } from "contracts/Admin";
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

export function useCW3ConfigState() {
  const { wallet, contract, isAdminSkip } = useAdminContract();
  const { data, isFetching, isLoading, isError } =
    admin_api.endpoints.cw3Config.useQueryState(contract.cw3Config, {
      skip: isAdminSkip || wallet?.network.chainID === chainIDs.localterra,
    });
  return {
    cw3ConfigState: data,
    isCW3ConfigLoading: isFetching || isLoading,
    isError,
  };
}
