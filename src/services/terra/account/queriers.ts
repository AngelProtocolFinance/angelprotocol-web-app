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
