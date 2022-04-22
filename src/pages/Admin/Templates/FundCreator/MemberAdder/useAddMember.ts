import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addFundMember } from "slices/admin/newFundMembers";
import { useGetter } from "store/accessors";
import { FundCreatorValues as V } from "../fundCreatorSchema";

export default function useAddMember() {
  const { getValues, setError, resetField, trigger } = useFormContext<V>();
  const newFundMembers = useGetter((state) => state.admin.newFundMembers);
  const dispatch = useDispatch();
  async function addMember() {
    const isValid = await trigger("newFundAddr");
    if (!isValid) return;

    const newFundMemberAddr = getValues("newFundAddr");
    const isMemberExisting = newFundMembers.indexOf(newFundMemberAddr) !== -1;

    if (isMemberExisting) {
      setError(
        "newFundAddr",
        { message: "address already added" },
        { shouldFocus: true }
      );
      return;
    }
    dispatch(addFundMember(newFundMemberAddr));
    resetField("newFundAddr");
  }

  return { addMember, newFundMembers };
}
