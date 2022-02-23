import { useFormContext } from "react-hook-form";
import { useGetter, useSetter } from "store/accessors";
import { addMember as _addMember } from "services/admin/memberSlice";
import { MemberUpdatorValues } from "../memberUpdatorSchema";

export default function useAddMember() {
  const dispatch = useSetter();
  const membersCopy = useGetter((state) => state.admin.members);
  const { trigger, getValues, setError, resetField } =
    useFormContext<MemberUpdatorValues>();

  async function addMember() {
    const isValid = await trigger(["addr", "weight"], { shouldFocus: true });
    if (!isValid) return;

    const newMemberAddr = getValues("addr");
    const newMemberWeight = getValues("weight");
    const existingMember = membersCopy.find(
      (member) => member.addr === newMemberAddr
    );

    if (existingMember) {
      setError("addr", { message: "address already added or existing" });
    } else {
      dispatch(_addMember({ weight: +newMemberWeight, addr: newMemberAddr }));
      resetField("addr");
      resetField("weight");
    }
  }

  return { addMember };
}
