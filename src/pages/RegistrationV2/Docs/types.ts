import { Asset } from "./FileDropzone";

export type FormValues = {
  proofOfIdentity: Asset;
  proofOfRegistration: Asset;
  financialStatements: Asset;
  annualReports: Asset;
  website: string;
  sdgs: number[];
  isKYCRequired: boolean;
  hasAuthority: boolean;
  hasAgreedToTerms: "Yes" | "No";
};
