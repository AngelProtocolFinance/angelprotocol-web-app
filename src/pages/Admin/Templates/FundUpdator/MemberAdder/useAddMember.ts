import { useFormContext } from "react-hook-form";
import { FundUpdateValues } from "@types-page/admin";
import { useGetter, useSetter } from "store/accessors";
import { addMember as _addMember } from "slices/admin/fundMembers";

export default function useAddMember() {
  const dispatch = useSetter();
  const fundMembers = useGetter((state) => state.admin.fundMembers);
  const { trigger, getValues, setError, resetField } =
    useFormContext<FundUpdateValues>();

  async function addMember() {
    const isValid = await trigger(["newMemberAddr"], { shouldFocus: true });
    if (!isValid) return;

    const newMemberAddr = getValues("newMemberAddr");
    const existingMember = fundMembers.find(
      (member) => member.addr === newMemberAddr
    );

    if (existingMember) {
      setError("newMemberAddr", {
        message: "address already added or existing",
      });
    } else {
      dispatch(_addMember(newMemberAddr));
      resetField("newMemberAddr");
    }
  }

  return { addMember };
}
