export interface UserState {
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
  WalletAddress?: string;
  token?: string;
  // for docs
  ProofOfIdentity?: any;
  ProofOfEmployment?: any;
  EndowmentAgreement?: any;
  ProofOfIdentityVerified?: any;
  ProofOfEmploymentVerified?: any;
  EndowmentAgreementVerified?: any;
  // for wallet
  TerraWallet?: any;
  // for key person
  IsKeyPersonCompleted?: boolean;
  // for meta profile
  IsMetaDataCompleted?: boolean;
}
