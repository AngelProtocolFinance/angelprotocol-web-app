import { RegistrationStatus } from "services/aws/types";

export type ApplicationStatus = "approved" | "inactive" | "under-review";

export type ApplicationStatusOptions = ApplicationStatus | "all";

export interface CharityApplication {
  CharityName: string;
  CharityName_ContactEmail: string;
  EndowmentAgreement: string;
  EndowmentAgreementVerified: boolean;
  PK: string;
  ProofOfEmployment: string;
  ProofOfEmploymentVerified: boolean;
  ProofOfIdentity: string;
  ProofOfIdentityVerified: boolean;
  RegistrationDate: string;
  RegistrationStatus: RegistrationStatus;
  SK: string;
  TerraWallet: string;
  poll_id?: number;
}
