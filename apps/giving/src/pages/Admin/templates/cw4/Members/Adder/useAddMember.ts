import { apCW4Members as APMembers } from "@ap/slices/admin";
import { useGetter, useSetter } from "@ap/store";
import { useFormContext } from "react-hook-form";
import { MemberUpdatorValues } from "@ap/types/admin";

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
