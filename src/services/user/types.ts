export interface User {
  Email: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Role: string;
  SK?: string;
  PK?: string;
  CharityName: string;
  CharityName_ContactEmail?: string;
  RegistrationDate: string;
  RegistrationStatus: string;
  EmailVerified: boolean;
  token?: string;
  ProofOfIdentity?: any;
  ProofOfEmployment?: any;
  EndowmentAgreement?: any;
  ProofOfIdentityVerified?: any;
  ProofOfEmploymentVerified?: any;
  EndowmentAgreementVerified?: any;
  TerraWallet?: any;
  IsKeyPersonCompleted?: boolean;
  IsMetaDataCompleted?: boolean;
}
