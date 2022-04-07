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

export type UpdateAdditionalInformationData = {
  PK?: string;
  body: {
    CharityLogo: FileObject;
    CharityBanner: FileObject;
    CharityOverview: string;
  };
};

export type UpdateAdditionalInformationResult = {
  CharityLogo: string;
  CharityBanner: string;
  CharityOverview: string;
};

export type RegistrationData = {
  ContactPerson: any;
  Metadata: any;
  Registration: any;
};
