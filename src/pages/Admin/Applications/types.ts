export enum RegistrationStatus {
  Approved = "approved",
  NotComplete = "not-complete",
  InReview = "under-review",
}

// export type ApplicationStatus = "approved" | "not-complete" | "under-review";

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
  RegistrationStatus: string;
  SK: string;
  TerraWallet: string;
  poll_id: number;
}
