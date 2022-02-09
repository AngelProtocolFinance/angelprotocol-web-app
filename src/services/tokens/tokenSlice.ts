import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tokens, ChangeToken } from "./types";

const initialState: Tokens = {
  token: "",
  apToken: "",
};

const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    updateTokensData: (state, { payload }: PayloadAction<ChangeToken>) => {
      if (payload.type === "user") {
        state.token = payload.token;
      }
      if (payload.type === "admin") {
        state.token = payload.token;
      }
    },
    removeTokensData: (state) => initialState,
  },
});

export default tokenSlice.reducer;
export const { updateTokensData, removeTokensData } = tokenSlice.actions;
