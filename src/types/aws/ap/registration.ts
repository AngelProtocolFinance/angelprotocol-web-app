import { UNSDG_NUMS } from "types/lists";
import { EndowDesignation } from ".";
import { FileObject } from "../common";

export type RegistrationStatus =
  | "Inactive"
  | "Under Review"
  | "Active"
  | "Rejected";

export type BankVerificationStatus = "Not Submitted" | "Under Review";

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
  bank_verification_status: BankVerificationStatus;
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

export type OrgDataForStep1 = { OrganizationName: string };

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

export type OrgDetails = {
  Website: string;
  HqCountry: string;
  ActiveInCountries: string[];
  EndowDesignation: EndowDesignation | "";
  KycDonorsOnly: boolean;
  UN_SDG: UNSDG_NUMS[];
};

export type FSAInquiry = {
  AuthorizedToReceiveTaxDeductibleDonations: boolean;
};

export type NonFSADocumentation = {
  DocType: "Non-FSA";
  EIN: string;
};

export type FSADocumentation = {
  DocType: "FSA";
  RegistrationNumber: string;
  ProofOfRegistration: FileObject;
  ProofOfIdentity: FileObject;
  LegalEntityType: string;
  ProjectDescription: string;
  FiscalSponsorshipAgreementSigningURL?: string;
  SignedFiscalSponsorshipAgreement?: string;
};

export type TDocumentation = {
  Documentation: FSADocumentation | NonFSADocumentation;
};

export type BankingDetails = {
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
export type DoneBanking = Append<DoneDocs, BankingDetails, {}>;
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
} & Partial<TDocumentation["Documentation"]>;

type BankingUpdate = {
  type: "banking";
} & Partial<BankingDetails>;

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

export type DocsUpdateResult = InitReg & TDocumentation["Documentation"];

export type SubmitResult = {
  RegistrationStatus: RegistrationStatus;
  Email: string;
};

/** type guards */
export function isDoneContact(data: SavedRegistration): data is DoneContact {
  return !!(data.ContactPerson as ContactDetails).FirstName;
}

export function isDoneOrgDetails(
  data: SavedRegistration
): data is DoneOrgDetails {
  return !!(data.Registration as OrgDetails).Website;
}

export function isDoneFSAInquiry(
  data: SavedRegistration
): data is DoneFSAInquiry {
  //could be false
  return !(
    (data.Registration as FSAInquiry)
      .AuthorizedToReceiveTaxDeductibleDonations == null
  );
}

export function isDoneDocs(data: SavedRegistration): data is DoneDocs {
  return !!(data.Registration as TDocumentation).Documentation;
}

export function isDoneBanking(data: SavedRegistration): data is DoneBanking {
  return !!(data.Registration as BankingDetails).wise_recipient_id!!;
}
