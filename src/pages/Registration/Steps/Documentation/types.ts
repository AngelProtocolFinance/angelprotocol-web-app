import { OptionType } from "components/registration";
import { Asset } from "../../../../components/registration/FileDropzone";

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
