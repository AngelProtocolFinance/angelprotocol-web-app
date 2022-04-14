import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import getDefaultUser from "./getDefaultUser";
import { User } from "./types";

const STORAGE_KEY = "user";

const loadUser = (): User => {
  const localUser = localStorage.getItem(STORAGE_KEY);
  return !!localUser ? (JSON.parse(localUser) as User) : getDefaultUser();
};

const userSlice = createSlice({
  name: "user",
  initialState: loadUser(),
  reducers: {
    removeUser: (state) => {
      localStorage.removeItem(STORAGE_KEY);
      return getDefaultUser();
    },
    updateUser: (state, { payload }: PayloadAction<User>) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      return payload;
    },
  },
});

export default userSlice.reducer;
export const { removeUser, updateUser } = userSlice.actions;
