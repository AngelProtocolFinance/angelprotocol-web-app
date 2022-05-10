import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Charity } from "@types-server/aws";

const getDefaultCharity = (): Charity => ({
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
    RegistrationStatus: "Inactive",
    Website: "",
    UN_SDG: 0,
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
    EndowmentContract: "",
    TerraWallet: "",
  },
});

const STORAGE_KEY = "charity";

const loadCharity = (): Charity => {
  const localCharity = localStorage.getItem(STORAGE_KEY);
  return !!localCharity
    ? (JSON.parse(localCharity) as Charity)
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
    updateCharity: (state, { payload }: PayloadAction<Charity>) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      return payload;
    },
  },
});

const charityReducer = charitySlice.reducer;

export { charityReducer };
export const { removeCharity, updateCharity } = charitySlice.actions;
