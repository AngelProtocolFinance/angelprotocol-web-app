import { useEffect } from "react";
import { setInitialMembers } from "services/admin/memberSlice";
import { useMembers } from "services/terra/admin/queriers";
import { useGetter, useSetter } from "store/accessors";

export default function useInitMemberUpdator() {
  const dispatch = useSetter();
  const { members, isMembersLoading } = useMembers();
  const membersCopy = useGetter((state) => state.admin.members);

  useEffect(() => {
    if (members.length > 0) {
      dispatch(
        setInitialMembers(
          members.map((member) => ({
            ...member,
            is_deleted: false,
            is_added: false,
          }))
        )
      );
    }
    //eslint-disable-next-line
  }, [members]);

  return { membersCopy, isMembersLoading };
}
