import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Update } from "services/aws/leaderboard/types";
import { State } from "./types";

const initialState: State = {
  endowmentBalances: [],
};

const charitySlice = createSlice({
  name: "charity",
  initialState,
  reducers: {
    addEndowmentBalance: (state, { payload }: PayloadAction<Update>) => {
      state.endowmentBalances.push(payload);
    },
  },
});

export default charitySlice.reducer;
export const { addEndowmentBalance } = charitySlice.actions;
