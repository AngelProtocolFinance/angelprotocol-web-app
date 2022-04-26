import { LOCAL_TERRA } from "../constants";
import { account_api } from "./account";
import useAccountContract from "./useAccountContract";

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
  const { wallet, contract } = useAccountContract(address);
  const { useEndowmentProfileQuery } = account_api;
  const { data, isError, isLoading, isFetching } = useEndowmentProfileQuery(
    contract.profile,
    { skip: skip || wallet?.network.chainID === LOCAL_TERRA }
  );

  return {
    profile: data,
    isProfileError: isError,
    isProfileLoading: isLoading || isFetching,
  };
}
