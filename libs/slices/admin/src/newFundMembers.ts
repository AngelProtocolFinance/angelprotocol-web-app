import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: string[] = [];

const newFundMembers = createSlice({
  name: "newFundMembers",
  initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<string>) => {
      state.push(payload);
    },
    reset: () => {
      return initialState;
    },
    remove: (state, { payload }: PayloadAction<string>) => {
      const fundMemberIdx = state.indexOf(payload);
      state.splice(fundMemberIdx, 1);
    },
  },
});

export default newFundMembers.reducer;
export const { actions } = newFundMembers;
