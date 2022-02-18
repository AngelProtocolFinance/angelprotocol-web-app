import { useFormContext } from "react-hook-form";
import { Values } from "./MemberAdder";
import {
  MemberCopy,
  addMember as _addMember,
} from "services/admin/memberSlice";
import { useGetter, useSetter } from "store/accessors";

export default function useAddMember() {
  const { setError, handleSubmit } = useFormContext<Values>();
  const dispatch = useSetter();
  const membersCopy = useGetter((state) => state.admin.members);

  function addMember(data: Values) {
    const new_member: MemberCopy = {
      addr: data.addr,
      weight: +data.weight,
      is_added: true,
      is_deleted: false,
    };
    const existing_member = membersCopy.find(
      (member) => member.addr === new_member.addr
    );
    if (existing_member) {
      setError("addr", { message: "address already added or existing" });
    } else {
      dispatch(_addMember({ weight: +data.weight, addr: data.addr }));
    }
  }

  return { addMember: handleSubmit(addMember) };
}
