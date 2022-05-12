import { ContactRoles, ReferralMethods } from "pages/Registration/constants";

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

export type ContactDetailsData = {
  ContactPerson: ContactPerson;
  Registration: Pick<
    Registration,
    | "CharityName"
    | "CharityName_ContactEmail"
    | "RegistrationDate"
    | "RegistrationStatus"
  >;
};

export type ContactDetailsRequest = {
  PK?: string;
  body: {
    ContactPerson: Omit<ContactPerson, "EmailVerified" | "SK">;
    Registration: Pick<Registration, "CharityName">;
  };
};

export type ContactPerson = {
  Email: string;
  EmailVerified?: boolean;
  FirstName: string;
  LastName: string;
  OtherRole?: string;
  OtherReferralMethod?: string;
  PhoneNumber: string;
  PK?: string;
  ReferralMethod: ReferralMethods;
  Role: ContactRoles;
  SK: "ContactPerson";
};

export type EndowmentTier = 1 | 2 | 3;

export type FileObject = {
  name: string;
  publicUrl?: string;
};

export type Metadata = {
  Banner: FileObject;
  CharityLogo: FileObject;
  CharityOverview: string;
  EndowmentContract: string;
  SK: "Metadata";
  TerraWallet: string;
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
  SK: "Registration";
  Tier?: EndowmentTier;
  UN_SDG: number;
  Website: string;
};

export type RegistrationStatus =
  | "Inactive"
  | "Under Review"
  | "Approved"
  | "Active";

export type SubmitData = {
  PK: string;
  EndowmentContract: string;
};

export type SubmitResult = {
  RegistrationStatus: RegistrationStatus;
  EndowmentContract: string;
};

export interface UpdateApplication {
  PK: string;
  poll_id: string;
  chain_id: string;
}

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

export type UpdateDocumentationResult = {
  Tier: EndowmentTier;
  Website: string;
  UN_SDG: number;
  ProofOfIdentity: FileObject;
  ProofOfRegistration: FileObject;
  FinancialStatements: FileObject[];
  AuditedFinancialReports: FileObject[];
};
