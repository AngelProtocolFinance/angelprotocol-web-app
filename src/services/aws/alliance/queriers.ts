import { alliance_api } from "./alliance";

export function useAllianceMembers() {
  const { useAllianceMembersQuery } = alliance_api;
  const {
    data = [],
    isLoading,
    isFetching,
  } = useAllianceMembersQuery(undefined);
  return {
    allianceMembers: data,
    isAllianceMembersLoading: isLoading || isFetching,
  };
}
