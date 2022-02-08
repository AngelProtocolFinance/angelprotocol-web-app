import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tokens } from "./types";

const initialState: Tokens = {
  token: "",
  apToken: "",
};
const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    updateTokensData: (state, { payload }: PayloadAction<Tokens>) => payload,
    removeTokensData: (state) => initialState,
  },
});

export default tokenSlice.reducer;
export const { updateTokensData, removeTokensData } = tokenSlice.actions;
