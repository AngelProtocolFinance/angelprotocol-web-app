import { FileObject } from "services/aws/types";

export interface User {
  Email: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Role: string;
  SK?: string;
  PK?: string;
  CharityLogo: string;
  CharityBanner: string;
  CharityName: string;
  CharityName_ContactEmail?: string;
  CharityOverview: string;
  RegistrationDate: string;
  RegistrationStatus: string;
  EmailVerified: boolean;
  TerraWallet?: any;
  IsKeyPersonCompleted?: boolean;
  IsMetaDataCompleted?: boolean;
  token?: string;
  Website: string;
  UN_SDG: number;
  ProofOfIdentity: FileObject[];
  ProofOfRegistration: FileObject[];
  FinancialStatements: FileObject[];
  AuditedFinancialReports: FileObject[];
  ProofOfIdentityVerified?: boolean;
  ProofOfRegistrationVerified: boolean;
  FinancialStatementsVerified: boolean;
  AuditedFinancialReportsVerified: boolean;
  Metadata: any;
}

export enum UserTypes {
  CHARITY_OWNER = "charity-owner",
  WEB_APP = "angelprotocol-web-app",
}
