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
  RegistrationStatus: "Not Complete",
  EmailVerified: false,
  token: "",
  Website: "",
  UN_SDG: -1,
  ProofOfIdentity: { name: "" },
  ProofOfRegistration: { name: "" },
  FinancialStatements: [],
  AuditedFinancialReports: [],
  ProofOfIdentityVerified: false,
  ProofOfRegistrationVerified: false,
  FinancialStatementsVerified: false,
  AuditedFinancialReportsVerified: false,
  Metadata: {
    Banner: { name: "" },
    CharityLogo: { name: "" },
    CharityOverview: "",
    TerraWallet: "",
  },
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
