import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Member } from "types/server/contracts";

const initialState: MemberCopy[] = [];

const apCW4MembersSlice = createSlice({
  name: "admin/apCW4Members",
  initialState,
  reducers: {
    setMembers: (_, { payload }: PayloadAction<MemberCopy[]>) => payload,

    toggleDeleteExistingMember: (state, { payload }: PayloadAction<string>) => {
      const memberToMark = state.find((member) => member.addr === payload);
      //markDelete is triggered from list rendered by this state
      memberToMark!.is_deleted = !memberToMark!.is_deleted;
    },
    addMember: (state, { payload }: PayloadAction<Member>) => {
      state.push({ ...payload, is_deleted: false, is_added: true });
    },
    undoAddMember: (state, { payload }: PayloadAction<string>) => {
      const memberIdx = state.findIndex((member) => member.addr === payload);
      state.splice(memberIdx, 1);
    },
  },
});

export default apCW4MembersSlice.reducer;
export const {
  toggleDeleteExistingMember,
  addMember,
  undoAddMember,
  setMembers,
} = apCW4MembersSlice.actions;

export type MemberCopy = Member & { is_deleted: boolean; is_added: boolean };
