import { Charity } from "types/aws";

export const placeholderCharity: Charity = {
  ContactPerson: {
    Email: "",
    EmailVerified: false,
    EmailVerificationLastSentDate: new Date(0).toISOString(),
    FirstName: "",
    Goals: "",
    LastName: "",
    PhoneNumber: "",
    PK: "",
    ReferralMethod: "angel-alliance",
    Role: "ceo",
    SK: "ContactPerson",
  },
  Registration: {
    Name: "",
    Name_ContactEmail: "",
    RegistrationDate: "",
    RegistrationStatus: "Inactive",
    Website: "",
    UN_SDG: 1,
    ProofOfIdentity: undefined,
    ProofOfRegistration: undefined,
    FinancialStatements: [],
    AuditedFinancialReports: [],
    ProofOfIdentityVerified: false,
    ProofOfRegistrationVerified: false,
    FinancialStatementsVerified: false,
    AuditedFinancialReportsVerified: false,
    SK: "Registration",
  },
  Metadata: {
    Banner: undefined,
    Logo: undefined,
    Overview: "",
    EndowmentContract: "",
    EndowmentId: 0,
    KycDonorsOnly: false,
    SK: "Metadata",
    JunoWallet: "",
  },
};
