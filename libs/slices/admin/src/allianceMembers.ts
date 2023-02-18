import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AllianceMemberWithFlags } from "./types";
import { AllianceMember } from "@ap/types/contracts";

const initialState: {
  isEditingMember: boolean;
  members: AllianceMemberWithFlags[];
} = { isEditingMember: false, members: [] };

const allianceMembers = createSlice({
  name: "allianceMembers",
  initialState,
  reducers: {
    setIsEditing: (state, { payload }: PayloadAction<boolean>) => {
      state.isEditingMember = payload;
    },

    saveEdits: (state, { payload }: PayloadAction<AllianceMember>) => {
      const memberToEdit = state.members.find(
        (member) => member.wallet === payload.wallet
      );
      if (memberToEdit) {
        memberToEdit.edits = payload;
      }
    },

    resetEdits: (state, { payload }: PayloadAction<string>) => {
      const memberToEdit = state.members.find(
        (member) => member.wallet === payload
      );
      if (memberToEdit) {
        memberToEdit.edits = undefined;
      }
    },

    set: (state, { payload }: PayloadAction<AllianceMemberWithFlags[]>) => {
      state.members = payload;
    },

    toggleDelete: (state, { payload }: PayloadAction<string>) => {
      const memberToMark = state.members.find(
        (member) => member.wallet === payload
      );
      //markDelete is triggered from list rendered by this state
      memberToMark!.isDeleted = !memberToMark!.isDeleted;
    },
    add: (state, { payload }: PayloadAction<AllianceMember>) => {
      state.members.unshift({
        //add a defaulted alliance member
        ...payload,
        isAdded: true,
        isDeleted: false,
      });
    },
    undoAdd: (state, { payload }: PayloadAction<string>) => {
      const memberIdx = state.members.findIndex(
        (member) => member.wallet === payload
      );
      state.members.splice(memberIdx, 1);
    },
  },
});

export default allianceMembers.reducer;
export const { actions } = allianceMembers;
