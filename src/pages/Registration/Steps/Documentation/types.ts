import { Asset, OptionType } from "components/registration";

export type FormValues = {
  proofOfIdentity: Asset;
  proofOfRegistration: Asset;
  financialStatements: Asset;
  auditedFinancialReports: Asset;
  website: string;
  sdgs: OptionType<number>[];
  isKYCRequired: "Yes" | "No";
  hasAuthority: boolean;
  hasAgreedToTerms: boolean;
};
