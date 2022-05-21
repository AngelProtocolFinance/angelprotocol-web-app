import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AllianceMember } from "types/server/contracts";
import { AllianceMemberWithFlags } from "slices/admin/types";

const initialState: {
  isEditingMember: boolean;
  members: AllianceMemberWithFlags[];
} = { isEditingMember: false, members: [] };

const allianceMembersSlice = createSlice({
  name: "admin/allianceMembers",
  initialState,
  reducers: {
    setIsEditingMember: (state, { payload }: PayloadAction<boolean>) => {
      state.isEditingMember = payload;
    },

    saveMemberEdits: (state, { payload }: PayloadAction<AllianceMember>) => {
      const memberToEdit = state.members.find(
        (member) => member.wallet === payload.wallet
      );
      if (memberToEdit) {
        memberToEdit.edits = payload;
      }
    },

    resetMemberEdits: (state, { payload }: PayloadAction<string>) => {
      const memberToEdit = state.members.find(
        (member) => member.wallet === payload
      );
      if (memberToEdit) {
        memberToEdit.edits = undefined;
      }
    },

    setMembers: (
      state,
      { payload }: PayloadAction<AllianceMemberWithFlags[]>
    ) => {
      state.members = payload;
    },

    toggleDeleteExistingMember: (state, { payload }: PayloadAction<string>) => {
      const memberToMark = state.members.find(
        (member) => member.wallet === payload
      );
      //markDelete is triggered from list rendered by this state
      memberToMark!.isDeleted = !memberToMark!.isDeleted;
    },
    addMember: (state, { payload }: PayloadAction<AllianceMember>) => {
      state.members.unshift({
        //add a defaulted alliance member
        ...payload,
        isAdded: true,
        isDeleted: false,
      });
    },
    undoAddMember: (state, { payload }: PayloadAction<string>) => {
      const memberIdx = state.members.findIndex(
        (member) => member.wallet === payload
      );
      state.members.splice(memberIdx, 1);
    },
  },
});

export default allianceMembersSlice.reducer;
export const {
  toggleDeleteExistingMember,
  addMember,
  undoAddMember,
  setMembers,
  setIsEditingMember,
  saveMemberEdits,
  resetMemberEdits,
} = allianceMembersSlice.actions;
