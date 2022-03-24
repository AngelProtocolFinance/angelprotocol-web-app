import { useEffect } from "react";
import { setMembers } from "services/admin/allianceMembers";
import { useAllianceMembers } from "services/terra/indexFund/queriers";
import { useGetter, useSetter } from "store/accessors";
export default function useInitMembers() {
  const dispatch = useSetter();
  const { allianceMembers, isAllianceMembersLoading } = useAllianceMembers();

  const allianceCopy = useGetter(
    (state) => state.admin.allianceMembers.members
  );

  useEffect(() => {
    if (isAllianceMembersLoading) return;
    if (allianceMembers.length <= 0) return;

    dispatch(
      setMembers(
        allianceMembers.map((member) => ({
          ...member,
          isAdded: false,
          isDeleted: false,
        }))
      )
    );
  }, [dispatch, allianceMembers, isAllianceMembersLoading]);

  return {
    allianceCopy,
    isInitializing: isAllianceMembersLoading,
  };
}
