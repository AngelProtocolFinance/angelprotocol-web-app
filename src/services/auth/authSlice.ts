import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AdminAuthStatus, AuthState } from "./types";

const initialState: AuthState = {
  tca: { token: null },
  admin: {
    status: "unauthorized",
  },
};

//get sync stored token

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAdminStatus(state, { payload }: PayloadAction<AdminAuthStatus>) {
      state.admin.status = payload;
    },
  },
});

export default authSlice.reducer;
export const { updateAdminStatus } = authSlice.actions;
