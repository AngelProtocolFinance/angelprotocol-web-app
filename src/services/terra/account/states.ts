import { createAccountContract } from "contracts";
import { account_api } from "./account";

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
  const contract = createAccountContract(address);
  const { data } = account_api.endpoints.endowmentProfile.useQueryState(
    contract.profile
  );
  return {
    profileState: data,
  };
}
