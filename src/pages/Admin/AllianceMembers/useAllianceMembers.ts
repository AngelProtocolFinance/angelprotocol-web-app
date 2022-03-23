import sanitizeRegexSearchText from "helpers/sanitizeRegexSearchText";
import { useMemo } from "react";
import { allianceMemberDetails as detailPlaceHolder } from "services/aws/alliance/placeholders";
import { useAllianceLookup } from "services/aws/alliance/queriers";
import { MemberDetails } from "services/aws/alliance/types";
import { useTCAMembers } from "services/terra/indexFund/queriers";

export default function useAllianceMembers(searchText: string) {
  const { allianceLookup, isAllianceLookupLoading } = useAllianceLookup();
  const { tcaMembers, isTCAMembersLoading } = useTCAMembers();

  const allianceMembers: MemberDetails[] = useMemo(() => {
    if (isAllianceLookupLoading || isTCAMembersLoading) {
      return [];
    } else {
      return tcaMembers.map((memberAddress) => {
        const memberDetails =
          allianceLookup[memberAddress] || detailPlaceHolder;
        return {
          address: memberAddress,
          ...memberDetails,
        };
      });
    }
  }, [
    allianceLookup,
    tcaMembers,
    isAllianceLookupLoading,
    isTCAMembersLoading,
  ]);

  const filteredMembers = useMemo(() => {
    const searchRegex = new RegExp(
      sanitizeRegexSearchText(searchText).toLocaleLowerCase()
    );
    return allianceMembers.filter((member) =>
      //show toggled members on top of search result
      searchText === ""
        ? true
        : member.name.toLocaleLowerCase().search(searchRegex) !== -1 ||
          member.address.search(new RegExp(searchRegex)) !== -1
    );
  }, [searchText, allianceMembers]);

  return {
    filteredMembers,
    isInitializing: isAllianceLookupLoading || isTCAMembersLoading,
  };
}
