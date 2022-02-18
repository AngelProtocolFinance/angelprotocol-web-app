import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getSavedToken from "./getSavedToken";

export const TCA_TOKEN_KEY = "tca";
export type State = { tca: string | null };

const authSlice = createSlice({
  name: "auth",
  initialState: getSavedToken(),
  reducers: {
    saveToken: (state, { payload }: PayloadAction<string>) => {
      localStorage.setItem(TCA_TOKEN_KEY, payload);
      state.tca = payload;
    },

    deleteToken: (state) => {
      localStorage.removeItem(TCA_TOKEN_KEY);
      state.tca = null;
    },
  },
});

export default authSlice.reducer;
export const { saveToken, deleteToken } = authSlice.actions;
