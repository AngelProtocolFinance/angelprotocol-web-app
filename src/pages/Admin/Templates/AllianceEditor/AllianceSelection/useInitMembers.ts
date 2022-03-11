import { useEffect } from "react";
import { setMembers } from "services/admin/allianceMembers";
import { allianceMemberDetails as detailPlaceHolder } from "services/aws/alliance/placeholders";
import { useAllianceLookup } from "services/aws/alliance/queriers";
import { useTCAMembers } from "services/terra/indexFund/queriers";
import { useGetter, useSetter } from "store/accessors";
export default function useInitMembers() {
  const dispatch = useSetter();
  const { allianceLookup, isAllianceLookupLoading } = useAllianceLookup();
  const { tcaMembers, isTCAMembersLoading } = useTCAMembers();

  const allianceCopy = useGetter((state) => state.admin.allianceMembers);

  useEffect(() => {
    if (isAllianceLookupLoading || isTCAMembersLoading) {
      return;
    }

    if (tcaMembers.length > 0) {
      const memberWithDetails = tcaMembers.map((memberAddress) => {
        const memberDetails =
          allianceLookup[memberAddress] || detailPlaceHolder;
        return {
          address: memberAddress,
          ...memberDetails,
          isAdded: false,
          isDeleted: false,
        };
      });

      dispatch(setMembers(memberWithDetails));
    } else {
      return;
    }
  }, [isAllianceLookupLoading, isTCAMembersLoading, dispatch]);

  return {
    allianceCopy,
    isInitializing: isAllianceLookupLoading || isTCAMembersLoading,
  };
}
