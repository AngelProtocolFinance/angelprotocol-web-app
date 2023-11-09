import { UNSDG_NUMS } from "types/lists";
import { FileObject } from "../common";
import { EndowmentTierNum } from "./index";

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

type InitMeta = {
  PK: string;
  SK: "Metadata";
};

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

export type TDocumentation = {
  //user identity
  ProofOfIdentity: FileObject;

  //organization details
  EIN: string;
  ProofOfRegistration: FileObject;
  Website: string;
  Tier: EndowmentTierNum;
  HqCountry: string;
  EndowDesignation: string;
  ActiveInCountries: string[];
  LegalEntityType: string;
  ProjectDescription: string;

  //fiscal sponsorship
  AuthorizedToReceiveTaxDeductibleDonations: boolean;
  //only exists if AuthorizedToReceiveTaxDeductibleDonations is false
  FiscalSponsorshipAgreementSigningURL?: string;
  SignedFiscalSponsorshipAgreement?: string;

  //others
  KycDonorsOnly: boolean;
  CashEligible: boolean;
};

//INIT STEP
export type InitApplication = {
  Registration: InitReg;
  ContactPerson: InitContact;
  Metadata: InitMeta;
};

type OrgDataForStep1 = { OrganizationName: string };

type Append<Reg extends InitApplication, T, U, V> = {
  Registration: Reg["Registration"] & T;
  ContactPerson: Reg["ContactPerson"] & U;
  Metadata: Reg["Metadata"] & V;
};

type NewEndow = {
  EndowmentId?: number;
  /** when created 
TODO: should be part of Registration status
Inactive | Rejected | {id: number}
*/
};

export type DoneStep1 = Append<
  InitApplication,
  OrgDataForStep1,
  ContactDetails,
  {}
>;
export type DoneDocs = Append<DoneStep1, TDocumentation, {}, NewEndow>;

type Proposal = {
  application_id: number;
};
type InReview = Append<DoneDocs, Proposal, {}, {}>;

export type SavedRegistration =
  | InitApplication
  | DoneStep1
  | DoneDocs
  | InReview;

type ContactUpdate = {
  type: "contact details";
  ContactPerson: Pick<InitContact, "Email"> & Partial<ContactDetails>;
  Registration: OrgDataForStep1;
};

type DocsUpdate = {
  type: "documentation";
} & Omit<TDocumentation, "Tier"> &
  Partial<Pick<InitReg, "UN_SDG">>;

export type RegistrationUpdate = (ContactUpdate | DocsUpdate) & {
  reference: string;
};

export type ContactUpdateResult = {
  ContactPerson: ContactDetails;
  Registration: OrgDataForStep1;
};

export type DocsUpdateResult = InitReg & TDocumentation;

export type SubmitResult = {
  RegistrationStatus: RegistrationStatus;
  chain_id: string;
  application_id: number;
  Email: string;
};
