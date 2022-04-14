import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import getDefaultUser from "./getDefaultUser";
import { User } from "./types";

const userSlice = createSlice({
  name: "user",
  initialState: getDefaultUser(),
  reducers: {
    loadLocalStorageUser: (state) => {
      const localUser = localStorage.getItem("userData");
      const user: User = !!localUser ? JSON.parse(localUser) : getDefaultUser();
      return user;
    },
    removeUserData: (state) => getDefaultUser(),
    updateUserData: (state, { payload }: PayloadAction<User>) => payload,
  },
});

export default userSlice.reducer;
export const { loadLocalStorageUser, removeUserData, updateUserData } =
  userSlice.actions;
