import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { FundCreatorValues as V } from "pages/Admin/types";
import { useGetter } from "store/accessors";
import { addFundMember } from "slices/admin/newFundMembers";

export default function useAddMember() {
  const { getValues, setError, resetField, trigger } = useFormContext<V>();
  const newFundMembers = useGetter((state) => state.admin.newFundMembers);
  const dispatch = useDispatch();
  async function addMember() {
    const isValid = await trigger("newFundMemberId");
    if (!isValid) return;

    const newFundMemberId = getValues("newFundMemberId");
    const isMemberExisting = newFundMembers.indexOf(+newFundMemberId) !== -1;

    if (isMemberExisting) {
      setError(
        "newFundMemberId",
        { message: "address already added" },
        { shouldFocus: true }
      );
      return;
    }
    dispatch(addFundMember(+newFundMemberId));
    resetField("newFundMemberId");
  }

  return { addMember, newFundMembers };
}
