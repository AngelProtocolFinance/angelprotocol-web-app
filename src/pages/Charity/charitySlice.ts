import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EndowmentBalanceData } from "contracts/types";
import { State } from "./types";

const initialState: State = {
  endowmentBalances: [],
};

const charitySlice = createSlice({
  name: "charity",
  initialState,
  reducers: {
    addEndowmentBalance: (
      state,
      { payload }: PayloadAction<EndowmentBalanceData>
    ) => {
      state.endowmentBalances.push(payload);
    },
  },
});

export default charitySlice.reducer;
export const { addEndowmentBalance } = charitySlice.actions;
