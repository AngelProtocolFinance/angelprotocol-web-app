import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: string[] = [];

const newFundMembersSlice = createSlice({
  name: "admin/newFundMembers",
  initialState,
  reducers: {
    addFundMember: (state, { payload }: PayloadAction<string>) => {
      state.push(payload);
    },
    resetFundMembers: () => {
      return initialState;
    },
    removeFundMember: (state, { payload }: PayloadAction<string>) => {
      const fundMemberIdx = state.indexOf(payload);
      state.splice(fundMemberIdx, 1);
    },
  },
});

export default newFundMembersSlice.reducer;
export const { addFundMember, resetFundMembers, removeFundMember } =
  newFundMembersSlice.actions;
