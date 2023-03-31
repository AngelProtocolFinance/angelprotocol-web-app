import { useFormContext } from "react-hook-form";
import { FundUpdateValues } from "pages/Admin/types";
import { useGetter, useSetter } from "store/accessors";
import { addMember as _addMember } from "slices/admin/fundMembers";

export default function useAddMember() {
  const dispatch = useSetter();
  const fundMembers = useGetter((state) => state.admin.fundMembers);
  const { trigger, getValues, setError, resetField } =
    useFormContext<FundUpdateValues>();

  async function addMember() {
    const isValid = await trigger(["newMemberId"], { shouldFocus: true });
    if (!isValid) return;

    const newMemberId = getValues("newMemberId");
    const existingMember = fundMembers.find(
      (member) => member.id === newMemberId
    );

    if (existingMember) {
      setError("newMemberId", {
        message: "address already added or existing",
      });
    } else {
      dispatch(_addMember(newMemberId));
      resetField("newMemberId");
    }
  }

  return { addMember };
}
