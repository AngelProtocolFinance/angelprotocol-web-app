import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import getDefaultUser from "./getDefaultUser";
import { User } from "./types";

const loadUser = (): User => {
  const localUser = localStorage.getItem("userData");
  return !!localUser ? (JSON.parse(localUser) as User) : getDefaultUser();
};

const userSlice = createSlice({
  name: "user",
  initialState: loadUser(),
  reducers: {
    loadLocalStorageUser: (state) => loadUser(),
    removeUserData: (state) => getDefaultUser(),
    updateUserData: (state, { payload }: PayloadAction<User>) => {
      localStorage.setItem("userData", JSON.stringify(payload));
      return payload;
    },
  },
});

export default userSlice.reducer;
export const { loadLocalStorageUser, removeUserData, updateUserData } =
  userSlice.actions;
