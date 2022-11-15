import { Asset } from "./FileDropzone";

export type FormValues = {
  proofOfIdentity: Asset;
  proofOfRegistration: Asset;
  financialStatements: Asset;
  auditedFinancialReports: Asset;
  website: string;
  sdg: number;
  isKYCRequired: "Yes" | "No";
  hasAuthority: boolean;
  hasAgreedToTerms: boolean;
};
