import { FileObject } from "services/aws/types";

type Metadata = {
  SK?: "Metadata";
  CharityBanner: FileObject[];
  CharityLogo: FileObject[];
  CharityOverview: string;
  TerraWallet: string;
};

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
  Metadata: Metadata;
}

export enum UserTypes {
  CHARITY_OWNER = "charity-owner",
  WEB_APP = "angelprotocol-web-app",
}
