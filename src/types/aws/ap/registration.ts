import { EndowmentTierNum } from "../../contracts";
import { Optional } from "../../utils";

export type RegistrationStatus =
  | "Inactive"
  | "Under Review"
  | "Active"
  | "Rejected";

export type ApplicationStatus = "approved" | "not-complete" | "under-review";

export type ReferralMethods =
  | "angel-alliance"
  | "discord"
  | "facebook"
  | "linkedin"
  | "medium"
  | "press"
  | "search-engines"
  | "twitter"
  | "other";

export type ContactRoles =
  | "board-member"
  | "ceo"
  | "cfo"
  | "communications"
  | "fundraising-finance"
  | "leadership-team"
  | "legal"
  | "other"
  | "president"
  | "secretary"
  | "treasurer"
  | "vice-president";

export type ContactPerson = {
  Email: string;
  EmailVerified?: boolean;
  EmailVerificationLastSentDate: string;
  Goals: string;
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

export type FileObject = {
  name: string;
  publicUrl?: string;
};

type InitialRegistration = Optional<
  Registration,
  | "AuditedFinancialReports"
  | "AuditedFinancialReportsVerified"
  | "FinancialStatements"
  | "FinancialStatementsVerified"
  | "ProofOfIdentity"
  | "ProofOfIdentityVerified"
  | "ProofOfRegistration"
  | "ProofOfRegistrationVerified"
  | "Website"
>;

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
  Tier?: EndowmentTierNum;
  UN_SDG: number;
  Website: string;
};

type InitialMetaData = Optional<
  Metadata,
  | "Banner"
  | "CharityLogo"
  | "CharityOverview"
  | "EndowmentContract"
  | "JunoWallet"
  | "KycDonorsOnly"
>;
export type Metadata = {
  Banner: FileObject;
  CharityLogo: FileObject;
  CharityOverview: string;
  EndowmentContract: string;
  SK: "Metadata";
  JunoWallet: string;
  KycDonorsOnly: boolean;
};

export type Charity = {
  ContactPerson: ContactPerson;
  Metadata: Metadata;
  Registration: Registration;
};

export type UnprocessedCharity = {
  ContactPerson: ContactPerson;
  Registration: InitialRegistration;
  Metadata: InitialMetaData;
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

//*
export type ContactDetailsRequest = {
  PK?: string;
  body: {
    ContactPerson: Omit<ContactPerson, "SK" | "EmailVerificationLastSentDate">;
    Registration: Pick<Registration, "CharityName">;
  };
};

//*
export type SubmitData = {
  PK: string;
  EndowmentContract: string;
};

//*
export type SubmitResult = {
  RegistrationStatus: RegistrationStatus;
  EndowmentContract: string;
};

export type UpdateCharityMetadataData = {
  PK?: string;
  body: {
    Banner?: FileObject;
    CharityLogo?: FileObject;
    CharityOverview?: string;
    JunoWallet?: string;
  };
};

export type UpdateCharityMetadataResult = {
  Banner: FileObject;
  CharityLogo: FileObject;
  CharityOverview: string;
  JunoWallet: string;
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
  Tier: EndowmentTierNum;
  Website: string;
  UN_SDG: number;
  ProofOfIdentity: FileObject;
  ProofOfRegistration: FileObject;
  FinancialStatements: FileObject[];
  AuditedFinancialReports: FileObject[];
};

export type CharityApplication = Registration & {
  PK: string;
  poll_id: number;
};
