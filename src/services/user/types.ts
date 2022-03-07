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
  TerraWallet?: any;
  IsKeyPersonCompleted?: boolean;
  IsMetaDataCompleted?: boolean;
  token?: string;
  Website: string;
  UN_SDG: number;
  ProofOfIdentity: string[];
  ProofOfRegistration: string[];
  FinancialStatements: string[];
  AuditedFinancialReports: string[];
  ProofOfIdentityVerified?: boolean;
  ProofOfRegistrationVerified: boolean;
  FinancialStatementsVerified: boolean;
  AuditedFinancialReportsVerified: boolean;
}

export enum UserTypes {
  CHARITY_OWNER = "charity-owner",
  WEB_APP = "angelprotocol-web-app",
}
