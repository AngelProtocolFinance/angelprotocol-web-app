import { useGetter, useSetter } from "@/store/accessors";
import {
  AllianceMemberWithFlags,
  allianceMembers as members,
} from "@ap/slices/admin";
import { useFormContext } from "react-hook-form";
import { AllianceEditValues } from "@ap/types/admin";

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
      dispatch(members.setIsEditing(false));
    }
    if (member.isAdded) {
      dispatch(members.undoAdd(member.wallet));
    } else {
      dispatch(members.toggleDelete(member.wallet));
    }
  }

  function memberToggleEdit() {
    //prioritize existing edits on a member
    if (member.edits) {
      dispatch(members.resetEdits(member.wallet));
    } else {
      //reset previous edits
      resetFields();
      dispatch(members.setIsEditing(true));
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
