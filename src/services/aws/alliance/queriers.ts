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

export function useFilteredAllianceMembers(searchText: string, skip = false) {
  const { useAllianceMembersQuery } = alliance_api;
  const { filteredMembers = [], isFilteredMembersLoading } =
    useAllianceMembersQuery(undefined, {
      skip,
      selectFromResult: ({ data = [], isLoading, isFetching }) => ({
        filteredMembers: data.filter((member) =>
          searchText === ""
            ? true
            : member.name
                .toLocaleLowerCase()
                .search(new RegExp(searchText.toLocaleLowerCase())) !== -1 ||
              member.address.search(
                new RegExp(searchText.toLocaleLowerCase().trim())
              ) !== -1
        ),
        isFilteredMembersLoading: isLoading || isFetching,
      }),
    });
  return {
    filteredMembers,
    isFilteredMembersLoading,
  };
}
