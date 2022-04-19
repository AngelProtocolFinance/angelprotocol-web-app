import { ContactRoles } from "pages/Registration/constants";

export interface AWSQueryRes<T> {
  Count: number;
  ScannedCount: number;
  Items: T;
}

export type Charity = {
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
  Registration: Pick<Registration, "CharityName" | "CharityName_ContactEmail">;
  ContactPerson: ContactPerson;
};

export type ContactDetailsRequest = {
  PK?: string;
  body: ContactDetailsData;
};

export type ContactPerson = {
  Email: string;
  EmailVerified?: boolean;
  FirstName: string;
  LastName: string;
  OtherRole?: string;
  PhoneNumber: string;
  PK?: string;
  Role: ContactRoles;
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
  CharityName_ContactEmail?: string;
  FinancialStatements: FileObject[];
  FinancialStatementsVerified: boolean;
  ProofOfIdentity: FileObject;
  ProofOfIdentityVerified: boolean;
  ProofOfRegistration: FileObject;
  ProofOfRegistrationVerified: boolean;
  RegistrationDate: string;
  RegistrationStatus: RegistrationStatus;
  SK?: "Registration";
  UN_SDG: number;
  Website: string;
};

export type RegistrationStatus =
  | "Not Complete"
  | "UnderReview"
  | "Active"
  | "Complete";

export type UpdateDocumentationData = {
  PK?: string;
  body: {
    Website: string;
    UN_SDG: number;
    ProofOfIdentity: string;
    ProofOfRegistration: string;
    FinancialStatements: string[];
    AuditedFinancialReports: string[];
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
    Banner?: string;
    CharityLogo?: string;
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
