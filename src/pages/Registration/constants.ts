export type ContactRoles =
  | "president"
  | "vice-president"
  | "secretary"
  | "treasurer"
  | "ceo"
  | "cfo"
  | "other";

export type OptionType = { label: string; value: any };

export const contactRoleOptions: OptionType[] = [
  { label: "Chairperson / President", value: "president" },
  {
    label: "Vice-chairperson / Vice president",
    value: "vice_president",
  },
  { label: "Secretary", value: "secretary" },
  { label: "Treasurer", value: "treasurer" },
  { label: "CEO", value: "ceo" },
  { label: "CFO", value: "cfo" },
  { label: "Board Member", value: "board-member" },
  { label: "Leadership Team", value: "leadership-team" },
  { label: "Fundraising / Finance", value: "fundraising-finance" },
  { label: "Legal", value: "legal" },
  { label: "Communications", value: "communications" },
  { label: "Other", value: "other" },
];

export enum Folders {
  AuditedFinancialReports = "charity-registration-documents/audited-financial-reports",
  CharityProfileImageLogo = "charity-profile-images/logo",
  CharityProfileImageBanners = "charity-profile-images/banner",
  FinancialStatements = "charity-registration-documents/financial-statements",
  ProofOfIdentity = "charity-registration-documents/proof-of-identity",
  ProofOfRegistration = "charity-registration-documents/proof-of-registration",
}

export type ReferralMethods =
  | "angel-alliance"
  | "discord"
  | "facebook"
  | "linkedin"
  | "medium"
  | "press"
  | "search-engines"
  | "twitter"
  | "other";

export const referralMethodOptions: OptionType[] = [
  { label: "Angel Alliance", value: "angel-alliance" },
  { label: "Discord", value: "discord" },
  { label: "Facebook", value: "facebook" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "Medium", value: "medium" },
  { label: "Press", value: "press" },
  { label: "Search Engines", value: "search-engines" },
  { label: "Twitter", value: "twitter" },
  { label: "Other", value: "other" },
];

export const RevenueRanges: OptionType[] = [
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
