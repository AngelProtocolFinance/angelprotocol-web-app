import { Except } from "type-fest";
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
  | "better-giving-alliance"
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
  RejectionReason: string;
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
  PK: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Goals: string;
  Role: ContactRoles;
  OtherRole: string;
  ReferralMethod: ReferralMethods | "angel-alliance"; //legacy
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

type Reset<T> = { [K in keyof T]: null };
export type FSAInquiry = {
  AuthorizedToReceiveTaxDeductibleDonations: boolean;
};

export type FSASignerDocumentation = {
  OrgName: string;
  HqCountry: string;
  RegistrationNumber: string;
  ProofOfRegistration: FileObject;
  ProofOfIdentity: FileObject;
  LegalEntityType: string;
  ProjectDescription: string;
};

export type NonFSADocumentation = {
  DocType: "Non-FSA";
  EIN: string;
};

export type FSADocumentation = Except<
  FSASignerDocumentation,
  "HqCountry" | "OrgName"
> & {
  DocType: "FSA";
  FiscalSponsorshipAgreementSigningURL?: string;
  SignedFiscalSponsorshipAgreement?: string;
};

export type TDocumentation = {
  Documentation: FSADocumentation | NonFSADocumentation;
};

export type BankingDetails = {
  BankStatementFile: FileObject;
  wise_recipient_id: number;
};

export type DoneContact = Append<
  InitApplication,
  OrgDataForStep1,
  ContactDetails
>;
export type DoneOrgDetails = Append<DoneContact, OrgDetails, {}>;
export type DoneFSAInquiry = Append<DoneOrgDetails, FSAInquiry, {}>;

export type ResetFSAInquiry = Append<DoneOrgDetails, Reset<FSAInquiry>, {}>;

export type DoneDocs = Append<DoneFSAInquiry, TDocumentation, {}>;
export type ResetDocs = Append<DoneFSAInquiry, Reset<TDocumentation>, {}>;

export type DoneBanking = Append<DoneDocs, BankingDetails, {}>;

export type SubmissionDetails = { Email: string; EndowmentId?: number };

export type InReview = Append<DoneBanking, SubmissionDetails, {}>;

export type SavedRegistration =
  | InitApplication
  | DoneContact
  | DoneOrgDetails
  | DoneFSAInquiry
  | ResetFSAInquiry
  | DoneDocs
  | ResetDocs
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
  //FSADocumentation handled in pdf-signing-url generator
} & NonFSADocumentation;

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

export type Application = InReview["Registration"] & Pick<InitContact, "Email">;

type WiseRecipient = {
  accountName: string;
  accountNumber: string;
  address: string;
  bankName: string;
};

export type ApplicationDetails = InReview & {
  WiseRecipient?: WiseRecipient;
};

//could be futher simplified to just {verdict: "approved" | string}
export type ApplicationVerdict = { PK: string } & (
  | { verdict: "approved" }
  | { verdict: "rejected"; rejectionReason: string }
);

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
  const { Registration: reg } = data as DoneFSAInquiry;
  return reg.AuthorizedToReceiveTaxDeductibleDonations != null;
}

export function isDoneDocs(data: SavedRegistration): data is DoneDocs {
  const { Registration: reg } = data as DoneDocs;
  return (
    !!reg.Documentation && reg.AuthorizedToReceiveTaxDeductibleDonations != null
  );
}

export function isDoneBanking(data: SavedRegistration): data is DoneBanking {
  const { Registration: reg } = data as DoneBanking;
  return !!reg.BankStatementFile && !!reg.Documentation;
}

export function isSubmitted(data: SavedRegistration): data is InReview {
  return !!(data.Registration as SubmissionDetails).Email;
}
