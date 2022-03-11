import { useEffect } from "react";
import { setMembers } from "services/admin/apCW4Members";
import { useMembers } from "services/terra/admin/queriers";
import { useGetter, useSetter } from "store/accessors";

export default function useInitMemberUpdator() {
  const dispatch = useSetter();
  const { members, isMembersLoading } = useMembers();
  const apCW4Members = useGetter((state) => state.admin.apCW4Members);

  useEffect(() => {
    if (members.length > 0) {
      dispatch(
        setMembers(
          members.map((member) => ({
            ...member,
            is_deleted: false,
            is_added: false,
          }))
        )
      );
    }
  }, [members, dispatch]);

  return { apCW4Members, isMembersLoading };
}
