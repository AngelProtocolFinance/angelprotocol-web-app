import { Charity } from "types/server/aws";

export enum Folders {
  AuditedFinancialReports = "charity-registration-documents/audited-financial-reports",
  CharityProfileImageLogo = "charity-profile-images/logo",
  CharityProfileImageBanners = "charity-profile-images/banner",
  FinancialStatements = "charity-registration-documents/financial-statements",
  ProofOfIdentity = "charity-registration-documents/proof-of-identity",
  ProofOfRegistration = "charity-registration-documents/proof-of-registration",
}

export const UN_SDGS = [
  "No poverty",
  "Zero hunger",
  "Good health and well-being",
  "Quality education",
  "Gender equality",
  "Clean water and sanitation",
  "Affordable and clean energy",
  "Decent work and economic growth",
  "Industry, Innovation and Infrastructure",
  "Reduced inequality",
  "Sustainable cities and communities",
  "Responsible consumption and production",
  "Climate action",
  "Life below water",
  "Life on land",
  "Peace, justice and strong institutions",
  "Partnership for the goals",
];

export const FORM_ERROR =
  "An error occured. Please try again and if the error persists after two failed attempts, please contact support@angelprotocol.io";

export const placeHolderCharity: Charity = {
  ContactPerson: {
    Email: "",
    EmailVerified: false,
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
    SK: "Registration",
  },
  Metadata: {
    Banner: { name: "" },
    CharityLogo: { name: "" },
    CharityOverview: "",
    EndowmentContract: "",
    KycDonorsOnly: false,
    SK: "Metadata",
    JunoWallet: "",
  },
};
