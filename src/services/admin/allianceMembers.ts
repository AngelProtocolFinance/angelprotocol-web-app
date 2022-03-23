import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllianceMember } from "services/terra/indexFund/types";

const initialState: AllianceMemberWithFlags[] = [];

const allianceMembersSlice = createSlice({
  name: "admin/allianceMembers",
  initialState,
  reducers: {
    setMembers: (_, { payload }: PayloadAction<AllianceMemberWithFlags[]>) =>
      payload,

    toggleDeleteExistingMember: (state, { payload }: PayloadAction<string>) => {
      const memberToMark = state.find((member) => member.wallet === payload);
      //markDelete is triggered from list rendered by this state
      memberToMark!.isDeleted = !memberToMark!.isDeleted;
    },
    addMember: (state, { payload }: PayloadAction<AllianceMember>) => {
      state.unshift({
        //add a defaulted alliance member
        ...payload,
        isAdded: true,
        isDeleted: false,
      });
    },
    undoAddMember: (state, { payload }: PayloadAction<string>) => {
      const memberIdx = state.findIndex((member) => member.wallet === payload);
      state.splice(memberIdx, 1);
    },
  },
});

export default allianceMembersSlice.reducer;
export const {
  toggleDeleteExistingMember,
  addMember,
  undoAddMember,
  setMembers,
} = allianceMembersSlice.actions;

export type AllianceMemberWithFlags = AllianceMember & {
  isDeleted: boolean;
  isAdded: boolean;
};
