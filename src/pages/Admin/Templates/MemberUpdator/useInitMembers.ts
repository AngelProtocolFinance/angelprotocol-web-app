import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { setMembers } from "services/admin/apCW4Members";
import { useMembers } from "services/terra/admin/queriers";
import { useGetter, useSetter } from "store/accessors";
import { MemberUpdatorValues } from "./memberUpdatorSchema";

export default function useInitMemberUpdator() {
  const { getValues } = useFormContext<MemberUpdatorValues>();
  const cws = getValues("cws");
  const dispatch = useSetter();
  const { members, isMembersLoading } = useMembers(cws);
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
