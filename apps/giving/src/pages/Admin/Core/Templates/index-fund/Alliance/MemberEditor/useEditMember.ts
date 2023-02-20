import { allianceMembers as AMs } from "@ap/slices/admin";
import { useGetter } from "@ap/store";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AllianceEditValues as AV } from "@ap/types/admin";

export default function useAddMember() {
  const { getValues, setError, resetField, trigger } = useFormContext<AV>();
  const { members: allianceMembers, isEditingMember } = useGetter(
    (state) => state.admin.allianceMembers
  );
  const dispatch = useDispatch();

  function resetEdit() {
    resetField("wallet");
    resetField("name");
    resetField("logo");
    resetField("website");
    dispatch(AMs.setIsEditing(false));
  }

  async function editMember() {
    const isValid = await trigger(["wallet", "name", "logo", "website"]);
    if (!isValid) return;

    const newAllianceMemberAddr = getValues("wallet");
    const name = getValues("name");
    const logo = getValues("logo");
    const website = getValues("website");

    if (isEditingMember) {
      //no need to check if member exist since same wallet address is
      //set on edits
      dispatch(
        AMs.saveEdits({
          wallet: newAllianceMemberAddr,
          name,
          logo,
          website,
        })
      );
      resetEdit();
    } else {
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
      dispatch(
        AMs.add({
          wallet: newAllianceMemberAddr,
          name,
          logo,
          website,
        })
      );
    }

    resetField("wallet");
    resetField("name");
    resetField("logo");
    resetField("website");
  }

  return { resetEdit, editMember, isEditingMember };
}
