import { useFormContext } from "react-hook-form";
import { useGetter, useSetter } from "store/accessors";
import { addMember as _addMember } from "services/admin/fundMembers";
import { FundUpdateValues } from "../fundUpdatorSchema";

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
