export type ApplicationStatus = "approved" | "not-complete" | "under-review";
// | "inactive"
// | "active";

export type ApplicationStatusOptions = ApplicationStatus | "all";
export type RegistrationStatus =
  | "Not Complete"
  | "Inactive"
  | "Active"
  | "Approved"
  | "Under Review";
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
