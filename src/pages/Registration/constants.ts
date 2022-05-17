export type ContactRoles =
  | "board-member"
  | "ceo"
  | "cfo"
  | "communications"
  | "fundraising-finance"
  | "leadership-team"
  | "legal"
  | "other"
  | "president"
  | "secretary"
  | "treasurer"
  | "vice-president";

export type OptionType<T> = { label: string; value: T };

export enum Folders {
  AuditedFinancialReports = "charity-registration-documents/audited-financial-reports",
  CharityProfileImageLogo = "charity-profile-images/logo",
  CharityProfileImageBanners = "charity-profile-images/banner",
  FinancialStatements = "charity-registration-documents/financial-statements",
  ProofOfIdentity = "charity-registration-documents/proof-of-identity",
  ProofOfRegistration = "charity-registration-documents/proof-of-registration",
}

export const RevenueRanges: OptionType<string>[] = [
  { label: "0 - 500k", value: "500" },
  { label: "500k - 1m", value: "1000" },
  { label: "1m - 5m", value: "5000" },
  { label: "5m - 10m", value: "10000" },
  { label: "10m - 20m", value: "20000" },
  { label: "20m+", value: "full" },
];

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
