import { Documentation } from "services/types";
import { Asset } from "components/FileDropzone";

export type FormValues = Pick<
  Documentation,
  "website" | "sdg" | "hasAuthority" | "hasAgreedToTerms"
> & {
  proofOfIdentity: Asset;
  proofOfRegistration: Asset;
  financialStatements: Asset;
  annualReports: Asset;
};
