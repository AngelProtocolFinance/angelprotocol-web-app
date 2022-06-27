import { createAccountContract } from "contracts";
import { account_api } from "./account";

export function useEndowmentCWs(address?: string) {
  const { useEndowmentCWsQuery } = account_api;
  const {
    data = {},
    isLoading,
    isFetching,
  } = useEndowmentCWsQuery(address!, { skip: !address });

  return {
    cwContracts: data,
    isCWContractsLoading: isLoading || isFetching,
  };
}

export function useEndowmentProfile(address: string, skip = false) {
  const contract = createAccountContract(address);
  const { useEndowmentProfileQuery } = account_api;
  const { data, isError, isLoading, isFetching } = useEndowmentProfileQuery(
    contract.profile,
    { skip }
  );

  return {
    profile: data,
    isProfileError: isError,
    isProfileLoading: isLoading || isFetching,
  };
}
