import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "./types";

const STORAGE_KEY = "user";

const getDefaultUser = (): User => ({
  ContactPerson: {
    Email: "",
    EmailVerified: false,
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Role: "ceo",
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
});

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

const userReducer = userSlice.reducer;

export { userReducer };
export const { removeUser, updateUser } = userSlice.actions;
