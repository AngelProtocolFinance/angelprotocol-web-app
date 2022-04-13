import { RegistrationStatus } from "services/user/types";

export interface AWSQueryRes<T> {
  Count: number;
  ScannedCount: number;
  Items: T;
}

export type CharityData = {
  ContactPerson: ContactPerson;
  Metadata: Metadata;
  Registration: Registration;
};

export type Metadata = {
  SK?: "Metadata";
  Banner: FileObject;
  CharityLogo: FileObject;
  CharityOverview: string;
  TerraWallet: string;
};

export type ContactDetailsData = {
  PK?: string;
  Registration: {
    CharityName: string;
  };
  ContactPerson: ContactPerson;
};

export type ContactPerson = {
  Email: string;
  EmailVerified: boolean;
  FirstName: string;
  LastName: string;
  OtherRole?: string;
  PhoneNumber: string;
  PK?: string;
  Role: string;
  SK?: "ContactPerson";
};

export type FileObject = {
  name: string;
  dataUrl?: string;
  sourceUrl?: string;
};

export type Registration = {
  AuditedFinancialReports: FileObject[];
  AuditedFinancialReportsVerified: boolean;
  CharityName: string;
  CharityName_ContactEmail: string;
  FinancialStatements: FileObject[];
  FinancialStatementsVerified: boolean;
  ProofOfIdentity: FileObject;
  ProofOfIdentityVerified: boolean;
  ProofOfRegistration: FileObject;
  ProofOfRegistrationVerified: boolean;
  RegistrationDate: string;
  RegistrationStatus: RegistrationStatus;
  SK?: "Registration";
  UN_SDG: string;
  Website: string;
};

export type UpdateDocumentationData = {
  PK?: string;
  body: {
    Website: string;
    UN_SDG: number;
    ProofOfIdentity: FileObject;
    ProofOfRegistration: FileObject;
    FinancialStatements: FileObject[];
    AuditedFinancialReports: FileObject[];
  };
};

// this is Partial data from User type
// src/services/user/types.ts -> User
export type UpdateDocumentationResult = {
  Website: string;
  UN_SDG: number;
  ProofOfIdentity: FileObject;
  ProofOfRegistration: FileObject;
  FinancialStatements: FileObject[];
  AuditedFinancialReports: FileObject[];
};

export type UpdateCharityMetadataData = {
  PK?: string;
  body: {
    Banner?: FileObject;
    CharityLogo?: FileObject;
    CharityOverview?: string;
    TerraWallet?: string;
  };
};

export type UpdateCharityMetadataResult = {
  Banner: FileObject;
  CharityLogo: FileObject;
  CharityOverview: string;
  TerraWallet: string;
};
