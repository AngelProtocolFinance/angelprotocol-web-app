import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { allianceMemberDetails } from "services/aws/alliance/placeholders";
import { MemberDetails } from "services/aws/alliance/types";

const initialState: AllianceMemberWithFlags[] = [];

const allianceMembersSlice = createSlice({
  name: "admin/allianceMembers",
  initialState,
  reducers: {
    setMembers: (_, { payload }: PayloadAction<AllianceMemberWithFlags[]>) =>
      payload,

    toggleDeleteExistingMember: (state, { payload }: PayloadAction<string>) => {
      const memberToMark = state.find((member) => member.address === payload);
      //markDelete is triggered from list rendered by this state
      memberToMark!.isDeleted = !memberToMark!.isDeleted;
    },
    addMember: (state, { payload }: PayloadAction<string>) => {
      state.unshift({
        //add a defaulted alliance member
        ...allianceMemberDetails,
        address: payload,
        isAdded: true,
        isDeleted: false,
      });
    },
    undoAddMember: (state, { payload }: PayloadAction<string>) => {
      const memberIdx = state.findIndex((member) => member.address === payload);
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

export type AllianceMemberWithFlags = MemberDetails & {
  isDeleted: boolean;
  isAdded: boolean;
};
