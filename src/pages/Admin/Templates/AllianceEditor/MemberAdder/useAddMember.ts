import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addMember as _addMember } from "services/admin/allianceMembers";
import { useGetter } from "store/accessors";
import { AllianceEditValues as AV } from "../alllianceEditSchema";

export default function useAddMember() {
  const { getValues, setError, resetField, trigger } = useFormContext<AV>();
  const allianceMembers = useGetter((state) => state.admin.allianceMembers);
  const dispatch = useDispatch();
  async function addMember() {
    const isValid = await trigger("walletAddr");
    if (!isValid) return;

    const newAllianceMemberAddr = getValues("walletAddr");
    const existingMember = allianceMembers.find(
      (member) => member.address === newAllianceMemberAddr
    );
    if (existingMember) {
      setError(
        "walletAddr",
        { message: "address already added" },
        { shouldFocus: true }
      );
      return;
    }
    dispatch(_addMember(newAllianceMemberAddr));
    resetField("walletAddr");
  }

  return { addMember };
}
