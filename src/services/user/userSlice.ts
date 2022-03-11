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
  CharityLogo: "",
  CharityOverview: "",
  CharityName_ContactEmail: "",
  RegistrationDate: "",
  RegistrationStatus: "",
  EmailVerified: false,
  token: "",
  TerraWallet: "",
  IsKeyPersonCompleted: false,
  IsMetaDataCompleted: false,
  Website: "",
  UN_SDG: -1,
  ProofOfIdentity: [],
  ProofOfRegistration: [],
  FinancialStatements: [],
  AuditedFinancialReports: [],
  ProofOfIdentityVerified: false,
  ProofOfRegistrationVerified: false,
  FinancialStatementsVerified: false,
  AuditedFinancialReportsVerified: false,
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
