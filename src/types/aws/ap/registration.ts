import { UNSDG_NUMS } from "types/lists";
import { FileObject } from "../common";
import { EndowmentTierNum } from "./index";

export type RegistrationStatus =
  | "Inactive"
  | "Under Review"
  | "Active"
  | "Rejected";

export type ApplicationStatus = "inactive" | "under-review" | "active";

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

export type InitReg = {
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

export type OrgData = { OrganizationName: string };
export type WalletData = { Wallet: string };

type Append<Reg extends InitApplication, T, U, V> = {
  Registration: Reg["Registration"] & T;
  ContactPerson: Reg["ContactPerson"] & U;
  Metadata: Reg["Metadata"] & V;
};

export type DoneContact = Append<InitApplication, OrgData, ContactDetails, {}>;
export type DoneDocs = Append<DoneContact, TDocumentation, {}, {}>;

type NewEndow = {
  EndowmentId?: number;
  /** when created 
TODO: should be part of Registration status
Inactive | Rejected | {id: number}
*/
};
export type DoneWallet = Append<DoneDocs, {}, {}, WalletData & NewEndow>;

type Proposal = {
  application_id: number;
};
export type InReview = Append<DoneWallet, Proposal, {}, {}>;

export type SavedRegistration =
  | InitApplication
  | DoneContact
  | DoneDocs
  | DoneWallet
  | InReview;

type ContactUpdate = {
  type: "contact details";
  ContactPerson: Pick<InitContact, "Email"> & Partial<ContactDetails>;
  Registration: OrgData;
};

type DocsUpdate = {
  type: "documentation";
} & Omit<TDocumentation, "Tier"> &
  Partial<Pick<InitReg, "UN_SDG">>;

type WalletUpdate = {
  type: "wallet";
} & WalletData;

export type RegistrationUpdate = (ContactUpdate | DocsUpdate | WalletUpdate) & {
  reference: string;
};

export type ContactUpdateResult = {
  ContactPerson: ContactDetails;
  Registration: OrgData;
};

export type DocsUpdateResult = InitReg & TDocumentation;
export type WalletUpdateResult = WalletData;

/** alias to provide context outside registration */
export type Application = DoneWallet;

/** shape used in Review proposals table */
export type EndowmentProposal = Pick<
  InitReg & Proposal,
  "PK" | "RegistrationDate" | "RegistrationStatus"
> &
  OrgData &
  TDocumentation &
  Pick<InitContact, "Email"> &
  Proposal;

export type SubmitResult = {
  RegistrationStatus: RegistrationStatus;
  chain_id: string;
  application_id: number;
  Email: string;
};
