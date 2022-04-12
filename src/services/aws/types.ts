export interface AWSQueryRes<T> {
  Count: number;
  ScannedCount: number;
  Items: T;
}

export type ContactDetailsData = {
  PK?: string;
  Registration: {
    CharityName: string;
  };
  ContactPerson: {
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    Role: string;
    OtherRole: string;
  };
};

export type FileObject = {
  name: string;
  dataUrl?: string;
  sourceUrl?: string;
};

export type UpdateDocumentationData = {
  PK?: string;
  body: {
    Website: string;
    UN_SDG: number;
    ProofOfIdentity: FileObject[];
    ProofOfRegistration: FileObject[];
    FinancialStatements: FileObject[];
    AuditedFinancialReports: FileObject[];
  };
};

// this is Partial data from User type
// src/services/user/types.ts -> User
export type UpdateDocumentationResult = {
  Website: string;
  UN_SDG: number;
  ProofOfIdentity: FileObject[];
  ProofOfRegistration: FileObject[];
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

export type Registration = any;

export type ContactPerson = any;

export type CharityData = {
  ContactPerson: ContactPerson;
  Metadata: {
    Banner: FileObject;
    CharityLogo: FileObject;
    CharityOverview: string;
    TerraWallet: string;
  };
  Registration: Registration;
};
