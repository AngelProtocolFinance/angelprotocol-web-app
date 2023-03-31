import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: number[] = [];

const newFundMembersSlice = createSlice({
  name: "admin/newFundMembers",
  initialState,
  reducers: {
    addFundMember: (state, { payload }: PayloadAction<number>) => {
      state.push(payload);
    },
    resetFundMembers: () => {
      return initialState;
    },
    removeFundMember: (state, { payload }: PayloadAction<number>) => {
      const fundMemberIdx = state.indexOf(payload);
      state.splice(fundMemberIdx, 1);
    },
  },
});

export default newFundMembersSlice.reducer;
export const { addFundMember, resetFundMembers, removeFundMember } =
  newFundMembersSlice.actions;
