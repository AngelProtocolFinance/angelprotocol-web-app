import { useEffect, useState } from "react";
import { useMembers } from "services/terra/admin/queriers";
import { MemberCopy } from "./UpdateForm";

export default function useMemberUpdator() {
  const members = useMembers();
  const [membersCopy, setMemberCopy] = useState<MemberCopy[]>([]);

  useEffect(() => {
    if (members.length > 0) {
      setMemberCopy(() =>
        members.map((member) => ({
          ...member,
          is_deleted: false,
          is_added: false,
        }))
      );
    }
    //to avoid render loop, only use state length as dep since 0 and something is a good indicator that data has arrived
  }, [members.length]);

  const add_member = (new_member: MemberCopy) => () => {
    const existing_member = membersCopy.find(
      (member) => member.addr === new_member.addr
    );
    if (existing_member) {
      alert("existing");
    } else {
      const modified = [...membersCopy, new_member];
      setMemberCopy(modified);
    }
  };

  const remove_member = (actual: MemberCopy) => () => {
    const modified = membersCopy.map((stored) => ({
      ...stored,
      is_deleted: actual.addr === stored.addr ? true : stored.is_deleted,
    }));
    setMemberCopy(modified);
  };

  const undo_add = (actual: MemberCopy) => () => {
    const modified = membersCopy.filter(
      (stored) => actual.addr !== stored.addr
    );
    setMemberCopy(modified);
  };

  const undo_remove = (actual: MemberCopy) => () => {
    const modified = membersCopy.map((stored) => ({
      ...stored,
      is_deleted: actual.addr === stored.addr ? false : stored.is_deleted,
    }));
    setMemberCopy(modified);
  };

  function get_updator(member: MemberCopy) {
    if (member.is_added) {
      return undo_add(member);
    } else if (member.is_deleted) {
      return undo_remove(member);
    } else {
      return remove_member(member);
    }
  }

  return { membersCopy, get_updator, add_member };
}
