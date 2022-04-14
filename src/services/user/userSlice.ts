import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "./types";

const initialState: User = {
  ContactPerson: {
    Email: "",
    EmailVerified: false,
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Role: "",
    PK: "",
  },
  Registration: {
    CharityName: "",
    CharityName_ContactEmail: "",
    RegistrationDate: "",
    RegistrationStatus: "Not Complete",
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
  },
  Metadata: {
    Banner: { name: "" },
    CharityLogo: { name: "" },
    CharityOverview: "",
    TerraWallet: "",
  },
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadLocalStorageUser: (state) => {
      const localUserData: User = JSON.parse(
        localStorage.getItem("userData") || "{}"
      );
      return localUserData;
    },
    removeUserData: (state) => initialState,
    updateUserData: (state, { payload }: PayloadAction<User>) => payload,
  },
});

export default userSlice.reducer;
export const { loadLocalStorageUser, removeUserData, updateUserData } =
  userSlice.actions;
