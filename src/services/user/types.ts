import { Metadata, FileObject } from "services/aws/types";

export type RegistrationStatus =
  | "Not Complete"
  | "UnderReview"
  | "Active"
  | "Complete";

export interface User {
  Email: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Role: string;
  PK?: string;
  CharityName: string;
  CharityName_ContactEmail?: string;
  RegistrationDate: string;
  RegistrationStatus: RegistrationStatus;
  EmailVerified: boolean;
  token?: string;
  Website: string;
  UN_SDG: number;
  ProofOfIdentity: FileObject;
  ProofOfRegistration: FileObject;
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
