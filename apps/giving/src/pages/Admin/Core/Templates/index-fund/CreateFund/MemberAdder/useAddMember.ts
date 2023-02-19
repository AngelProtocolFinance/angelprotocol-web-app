import { useGetter } from "@/store/accessors";
import { newFundMembers as NFMs } from "@ap/slices/admin";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { FundCreatorValues as V } from "@ap/types/admin";

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
    dispatch(NFMs.add(newFundMemberAddr));
    resetField("newFundAddr");
  }

  return { addMember, newFundMembers };
}
