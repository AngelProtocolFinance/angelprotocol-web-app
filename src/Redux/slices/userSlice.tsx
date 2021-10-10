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
  CharityName: "",
  CharityName_ContactEmail: "",
  RegistrationDate: "",
  RegistrationStatus: "",
  EmailVerified: false,
};

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    userData: initialUserState,
  },
  reducers: {
    updateUserData: (state, { payload }: PayloadAction<UserState>) => {
      state.userData = {
        ...payload,
      };
    },
    removeUserData: (state) => {
      state.userData = initialUserState;
    },
  },
});

export const userReducer = UserSlice.reducer;
