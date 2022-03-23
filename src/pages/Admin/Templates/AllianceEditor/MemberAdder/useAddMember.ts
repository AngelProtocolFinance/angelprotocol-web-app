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
    const isValid = await trigger(["wallet", "name", "logo", "website"]);
    if (!isValid) return;

    const newAllianceMemberAddr = getValues("wallet");
    const existingMember = allianceMembers.find(
      (member) => member.wallet === newAllianceMemberAddr
    );
    if (existingMember) {
      setError(
        "wallet",
        { message: "address already added" },
        { shouldFocus: true }
      );
      return;
    }

    const name = getValues("name");
    const logo = getValues("logo");
    const website = getValues("website");

    dispatch(
      _addMember({
        wallet: newAllianceMemberAddr,
        name,
        logo,
        website,
      })
    );
    resetField("wallet");
    resetField("name");
    resetField("logo");
    resetField("website");
  }

  return { addMember };
}
