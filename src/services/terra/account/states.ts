import { account_api } from "./account";
import useAccountContract from "./useAccountContract";

export function useEndowmentCWsState(address?: string) {
  const {
    data = {},
    isLoading,
    isFetching,
  } = account_api.endpoints.endowmentCWs.useQueryState(address!, {
    skip: !address,
  });

  return {
    cwContracts: data,
    isCWContractsLoading: isLoading || isFetching,
  };
}

export function useEndowmentProfileState(address: string) {
  const { contract } = useAccountContract(address);
  const { data } = account_api.endpoints.endowmentProfile.useQueryState(
    contract.profile
  );
  return {
    profileState: data,
  };
}
