import { Documentation } from "services/aws/registration/types";
import { Asset } from "components/FileDropzone";

export type FormValues = Pick<
  Documentation,
  "website" | "sdg" | "isKYCRequired" | "hasAuthority" | "hasAgreedToTerms"
> & {
  proofOfIdentity: Asset;
  proofOfRegistration: Asset;
  financialStatements: Asset;
  annualReports: Asset;
};
