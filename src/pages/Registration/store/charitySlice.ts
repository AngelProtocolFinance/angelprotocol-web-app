import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CharityData } from "./types";

const STORAGE_KEY = "charity";

const getDefaultCharity = (): CharityData => ({
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

const loadCharity = (): CharityData => {
  const localCharity = localStorage.getItem(STORAGE_KEY);
  return !!localCharity
    ? (JSON.parse(localCharity) as CharityData)
    : getDefaultCharity();
};

const charitySlice = createSlice({
  name: "charity",
  initialState: loadCharity(),
  reducers: {
    removeCharity: (state) => {
      localStorage.removeItem(STORAGE_KEY);
      return getDefaultCharity();
    },
    updateCharity: (state, { payload }: PayloadAction<CharityData>) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      return payload;
    },
  },
});

const charityReducer = charitySlice.reducer;

export { charityReducer };
export const { removeCharity, updateCharity } = charitySlice.actions;
