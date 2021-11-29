import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./types";

const initialState: User = {
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
  token: "",
  ProofOfIdentity: "",
  ProofOfEmployment: "",
  EndowmentAgreement: "",
  ProofOfIdentityVerified: "",
  ProofOfEmploymentVerified: "",
  EndowmentAgreementVerified: "",
  TerraWallet: "",
  IsKeyPersonCompleted: false,
  IsMetaDataCompleted: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserData: (state, { payload }: PayloadAction<User>) => payload,
    removeUserData: (state) => initialState,
  },
});

export default userSlice.reducer;
export const { updateUserData, removeUserData } = userSlice.actions;
