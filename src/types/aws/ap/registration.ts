import { UNSDG_NUMS } from "types/lists";
import { EndowmentTierNum } from "../../contracts";
import { Optional } from "../../utils";
import { FileObject } from "../common";

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
  OrganizationName: string;
  OrganizationName_ContactEmail?: string;
  FinancialStatements: FileObject[];
  FinancialStatementsVerified: boolean;
  ProofOfIdentity?: FileObject;
  ProofOfIdentityVerified: boolean;
  ProofOfRegistration?: FileObject;
  ProofOfRegistrationVerified: boolean;
  RegistrationDate: string;
  RegistrationStatus: RegistrationStatus;
  SK: "Registration";
  Tier?: EndowmentTierNum;
  UN_SDG: UNSDG_NUMS;
  Website: string;
};

type InitialMetaData = Optional<
  Metadata,
  | "Banner"
  | "Logo"
  | "Overview"
  | "EndowmentId"
  | "JunoWallet"
  | "KycDonorsOnly"
>;
export type Metadata = {
  Banner?: FileObject;
  Logo?: FileObject;
  Overview: string;
  EndowmentId: number;
  SK: "Metadata";
  JunoWallet: string;
  KycDonorsOnly: boolean;
};

export type Application = {
  ContactPerson: ContactPerson;
  Metadata: Metadata;
  Registration: Registration;
};

export type UnprocessedApplication = {
  ContactPerson: ContactPerson;
  Registration: InitialRegistration;
  Metadata: InitialMetaData;
};

export type ContactDetailsResult = {
  ContactPerson: ContactPerson;
  Registration: Pick<
    Registration,
    | "OrganizationName"
    | "OrganizationName_ContactEmail"
    | "RegistrationDate"
    | "RegistrationStatus"
  >;
};

//*
export type ContactDetailsRequest = {
  PK?: string;
  body: {
    ContactPerson: Omit<ContactPerson, "SK" | "EmailVerificationLastSentDate">;
    Registration: Pick<Registration, "OrganizationName">;
  };
};

//*
export type SubmitData = {
  PK: string;
  chain_id: string;
};

//*
export type SubmitResult = {
  RegistrationStatus: RegistrationStatus;
  chain_id: string;
  poll_id: number;
};

export type UpdateMetadataRequest = {
  PK?: string;
  body: {
    Banner?: FileObject;
    Logo?: FileObject;
    Overview?: string;
    JunoWallet?: string;
    KycDonorsOnly?: boolean;
  };
};

export type UpdateMetadataResult = {
  Banner: FileObject;
  Logo: FileObject;
  Overview: string;
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

export type EndowmentApplication = Registration & {
  PK: string;
  poll_id: number;
};
