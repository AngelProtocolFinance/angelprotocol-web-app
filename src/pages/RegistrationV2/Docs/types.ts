import { UNSDG_NUMS } from "types/lists";
import { OptionType } from "components/registration";
import { Asset } from "./FileDropzone";

export type FormValues = {
  proofOfIdentity: Asset;
  proofOfRegistration: Asset;
  financialStatements: Asset;
  auditedFinancialReports: Asset;
  website: string;
  sdg: OptionType<string>;
  isKYCRequired: "Yes" | "No";
  hasAuthority: boolean;
  hasAgreedToTerms: boolean;
};
