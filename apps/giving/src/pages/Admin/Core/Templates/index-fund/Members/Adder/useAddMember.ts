import { fundMembers as FMs } from "@ap/slices/admin";
import { useGetter, useSetter } from "@ap/store";
import { useFormContext } from "react-hook-form";
import { FundUpdateValues } from "@ap/types/admin";

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
      dispatch(FMs.add(newMemberAddr));
      resetField("newMemberAddr");
    }
  }

  return { addMember };
}
