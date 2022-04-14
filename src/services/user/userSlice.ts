import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import getDefaultUser from "./getDefaultUser";
import { User } from "./types";

const STORAGE_KEY = "userData";

const loadUser = (): User => {
  const localUser = localStorage.getItem(STORAGE_KEY);
  return !!localUser ? (JSON.parse(localUser) as User) : getDefaultUser();
};

const userSlice = createSlice({
  name: "user",
  initialState: loadUser(),
  reducers: {
    removeUserData: (state) => {
      localStorage.removeItem(STORAGE_KEY);
      return getDefaultUser();
    },
    updateUserData: (state, { payload }: PayloadAction<User>) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      return payload;
    },
  },
});

export default userSlice.reducer;
export const { removeUserData, updateUserData } = userSlice.actions;
