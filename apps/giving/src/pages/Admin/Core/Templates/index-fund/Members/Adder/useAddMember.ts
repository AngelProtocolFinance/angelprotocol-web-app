import { useGetter, useSetter } from "@/store/accessors";
import { fundMembers as FMs } from "@ap/slices/admin";
import { useFormContext } from "react-hook-form";
import { FundUpdateValues } from "@/pages/Admin/types";

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
