import { UNSDG_NUMS } from "types/lists";
import { FileObject } from "../common";

/**
 * Steps:
 * 1 - Registrant Details
 * 2 - Org details
 * 3 - FSA Questionaire or FSA info
 * 4 - FSADocumentation | EIN
 * 5 - BankDetails
 * 6 - Review
 */

export type RegistrationStatus =
  | "Inactive"
  | "Under Review"
  | "Active"
  | "Rejected";

export type ReferralMethods =
  | ""
  | "referral"
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
  | ""
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

type InitReg = {
  PK: string;
  SK: "Registration";
  RegistrationDate: string /** ISO string*/;
  RegistrationStatus: RegistrationStatus;
  UN_SDG: UNSDG_NUMS[];
};

export type InitContact = {
  PK: string;
  SK: "ContactPerson";
  Email: string;
};

//INIT STEP
export type InitApplication = {
  Registration: InitReg;
  ContactPerson: InitContact;
};

type Append<Reg extends InitApplication, R, C> = {
  Registration: Reg["Registration"] & R;
  ContactPerson: Reg["ContactPerson"] & C;
};

type OrgDataForStep1 = { OrganizationName: string };
export type ContactDetails = {
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Goals: string;
  Role: ContactRoles;
  OtherRole: string;
  ReferralMethod: ReferralMethods;
  ReferralCode: string; //when ReferralMethod is "referral"
  OtherReferralMethod: string; //when ReferralMethod is "other"
};

type OrgDetails = {
  Website: string;
  HqCountry: string;
  ActiveInCountries: string[];
  EndowDesignation: string;
  KycDonorsOnly: boolean;
  ProjectDescription: string;
};

export type FSAInquiry = {
  AuthorizedToReceiveTaxDeductibleDonations: boolean;
};

export type NonFSADocumentation = {
  Type: "Non-FSA";
  EIN: string;
};

type FSADocumentation = {
  Type: "FSA";
  RegistrationNumber: string;
  ProofOfRegistration: FileObject;
  ProofOfIdentity: FileObject;
  LegalEntityType: string;

  FiscalSponsorshipAgreementSigningURL: string;
  SignedFiscalSponsorshipAgreement?: string;
};

type TDocumentation = FSADocumentation | NonFSADocumentation;

type Banking = {
  BankStatement: FileObject;
  wise_recipient_id: string;
};

export type DoneContact = Append<
  InitApplication,
  OrgDataForStep1,
  ContactDetails
>;
export type DoneOrgDetails = Append<DoneContact, OrgDetails, {}>;
export type DoneFSAInquiry = Append<DoneOrgDetails, FSAInquiry, {}>;
export type DoneDocs = Append<DoneFSAInquiry, TDocumentation, {}>;
export type DoneBanking = Append<DoneDocs, Banking, {}>;
type InReview = Append<DoneBanking, { Email: string; EndowmentId: number }, {}>;

export type SavedRegistration =
  | InitApplication
  | DoneContact
  | DoneOrgDetails
  | DoneFSAInquiry
  | DoneDocs
  | DoneBanking
  | InReview;

type ContactUpdate = {
  type: "contact-details";
  ContactPerson: Pick<InitContact, "Email"> & Partial<ContactDetails>;
  Registration: OrgDataForStep1;
};

type OrgDetailsUpdate = {
  type: "org-details";
} & Partial<OrgDetails> &
  Partial<Pick<InitReg, "UN_SDG">>;

type FSAInquiryUpdate = {
  type: "fsa-inquiry";
} & Partial<FSAInquiry>;

type DocumentationUpdate = {
  type: "documentation";
} & Partial<TDocumentation>;

type BankingUpdate = {
  type: "banking";
} & Partial<Banking>;

export type RegistrationUpdate = (
  | ContactUpdate
  | OrgDetailsUpdate
  | FSAInquiryUpdate
  | DocumentationUpdate
  | BankingUpdate
) & {
  reference: string;
};

export type ContactUpdateResult = {
  ContactPerson: ContactDetails;
  Registration: OrgDataForStep1;
};

export type DocsUpdateResult = InitReg & TDocumentation;

export type SubmitResult = {
  RegistrationStatus: RegistrationStatus;
  Email: string;
};
