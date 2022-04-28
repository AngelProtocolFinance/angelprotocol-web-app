import { useFormContext } from "react-hook-form";
import { AllianceEditValues } from "@types-page/admin";
import { AllianceMemberWithFlags } from "@types-slice/admin";
import {
  resetMemberEdits,
  setIsEditingMember,
  toggleDeleteExistingMember,
  undoAddMember,
} from "slices/admin/allianceMembers";
import { useGetter, useSetter } from "store/accessors";

export default function useMember(member: AllianceMemberWithFlags) {
  const { setValue, setFocus, resetField } =
    useFormContext<AllianceEditValues>();
  const { isEditingMember } = useGetter((state) => state.admin.allianceMembers);
  const isEditable = !member.isAdded && !member.isDeleted;
  const isNotEdited = !member.edits;
  const dispatch = useSetter();

  function resetFields() {
    resetField("wallet");
    resetField("name");
    resetField("logo");
    resetField("website");
  }

  function memberToggleAddDelete() {
    //reset ongoing edit
    if (isEditingMember) {
      resetFields();
      dispatch(setIsEditingMember(false));
    }
    if (member.isAdded) {
      dispatch(undoAddMember(member.wallet));
    } else {
      dispatch(toggleDeleteExistingMember(member.wallet));
    }
  }

  function memberToggleEdit() {
    //prioritize existing edits on a member
    if (member.edits) {
      dispatch(resetMemberEdits(member.wallet));
    } else {
      //reset previous edits
      resetFields();
      dispatch(setIsEditingMember(true));
      //init edit form values
      setValue("wallet", member.wallet);
      setValue("name", member.name);
      setValue("logo", member.logo!);
      setValue("website", member.website!);
      setFocus("name");
    }
    //set focus to name
  }

  return { isEditable, isNotEdited, memberToggleEdit, memberToggleAddDelete };
}
