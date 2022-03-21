import { alliance_api } from "./alliance";

export function useAllianceLookup() {
  const { useAllianceLookupQuery } = alliance_api;
  const {
    data = {},
    isLoading,
    isFetching,
  } = useAllianceLookupQuery(undefined);
  return {
    allianceLookup: data,
    isAllianceLookupLoading: isLoading || isFetching,
  };
}
