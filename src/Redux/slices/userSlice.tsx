import { UserState } from "../../types/stateIntefaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialUserState: UserState = {
  Email: "",
  FirstName: "",
  LastName: "",
  PhoneNumber: "",
  Role: "",
  PK: "",
  SK: "",
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    updateUserData: (state, { payload }: PayloadAction<UserState>) => {
      state.Email = payload.Email;
    },
    removeUserData: (state) => {
      state = initialUserState;
    },
  },
});

export const userReducer = UserSlice.reducer;
export const { updateUserData } = UserSlice.actions;
