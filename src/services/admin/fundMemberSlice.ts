import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string[] = [];

const fundMemberSlice = createSlice({
  name: "admin/members",
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

export default fundMemberSlice.reducer;
export const { addFundMember, resetFundMembers, removeFundMember } =
  fundMemberSlice.actions;
