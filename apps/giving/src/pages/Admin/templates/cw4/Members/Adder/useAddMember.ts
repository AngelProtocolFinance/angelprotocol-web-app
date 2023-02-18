import { useGetter, useSetter } from "@/store/accessors";
import { apCW4Members as APMembers } from "@ap/slices/admin";
import { useFormContext } from "react-hook-form";
import { MemberUpdatorValues } from "@/pages/Admin/types";

export default function useAddMember() {
  const dispatch = useSetter();
  const apCW4Members = useGetter((state) => state.admin.apCW4Members);
  const { trigger, getValues, setError, resetField } =
    useFormContext<MemberUpdatorValues>();

  async function addMember() {
    const isValid = await trigger(["addr", "weight"], { shouldFocus: true });
    if (!isValid) return;

    const newMemberAddr = getValues("addr");
    const newMemberWeight = getValues("weight");
    const existingMember = apCW4Members.find(
      (member) => member.addr === newMemberAddr
    );

    if (existingMember) {
      setError("addr", { message: "address already added or existing" });
    } else {
      dispatch(
        APMembers.add({ weight: +newMemberWeight, addr: newMemberAddr })
      );
      resetField("addr");
      resetField("weight");
    }
  }

  return { addMember };
}
