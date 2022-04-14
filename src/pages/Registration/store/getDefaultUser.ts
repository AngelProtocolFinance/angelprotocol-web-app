import { User } from "./types";

const getDefaultUser = (): User => ({
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
});

export default getDefaultUser;
