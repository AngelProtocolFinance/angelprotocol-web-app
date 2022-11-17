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

export type InitReg = {
  PK: string;
  SK: "Registration";
  RegistrationDate: string /** ISO string*/;
  RegistrationStatus: "Inactive";
  UN_SDG: number;
};

export type InitContact = {
  PK: string;
  SK: "ContactPerson";
  Email: string;
  EmailVerified: boolean;
  EmailVerificationLastSentDate: string /** ISO string */;
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
  OtherReferralMethod: string;
};

export type TDocumentation = {
  ProofOfIdentity: FileObject;
  ProofOfRegistration: FileObject;
  Website: string;
  Tier: EndowmentTierNum;
  //based on tier
  FinancialStatements?: FileObject[];
  AuditedFinancialReports?: FileObject[];
};

export type RegProfile = {
  Banner: FileObject;
  Logo: FileObject;
  Overview: string;
  KycDonorsOnly: boolean;
};

//INIT STEP
export type InitApplication = {
  Registration: InitReg;
  ContactPerson: InitContact;
  Metadata: InitMeta;
};

export type OrgData = { OrganizationName: string };
export type WalletData = { JunoWallet: string };

export type DoneContact = {
  Registration: InitReg & OrgData;
  ContactPerson: InitContact & ContactDetails;
  Metadata: InitMeta;
};

export type DoneDocs = {
  Registration: InitReg & OrgData & TDocumentation;
  ContactPerson: InitContact & ContactDetails;
  Metadata: InitMeta;
};

export type DoneProfile = {
  Registration: InitReg & OrgData & TDocumentation;
  ContactPerson: InitContact & ContactDetails;
  Metadata: InitMeta & RegProfile;
};

export type DoneWallet = {
  Registration: InitReg & OrgData & TDocumentation;
  ContactPerson: InitContact & ContactDetails;
  Metadata: InitMeta &
    RegProfile &
    WalletData & {
      EndowmentId?: number;
      /** when created 
      TODO: should be part of Registration status
      Inactive | Rejected | {id: number}
      */
    };
};

export type SavedRegistration =
  | InitApplication
  | DoneContact
  | DoneDocs
  | DoneProfile
  | DoneWallet;

type ContactUpdate = {
  type: "contact details";
  ContactPerson: Pick<InitContact, "Email"> & Partial<ContactDetails>;
  Registration: OrgData;
};

type DocsUpdate = {
  type: "documentation";
} & Omit<TDocumentation, "Tier"> &
  Partial<Pick<InitReg, "UN_SDG">>;

type ProfileUpdate = {
  type: "profile assets";
} & Pick<RegProfile, "Logo"> &
  Partial<Omit<RegProfile, "Logo">>;

type WalletUpdate = {
  type: "wallet";
} & WalletData;

export type RegistrationUpdate =
  | ContactUpdate
  | DocsUpdate
  | ProfileUpdate
  | WalletUpdate;

/** alias to provide context outside registration */
export type Application = DoneWallet;

/** shape used in Review proposals table */
export type EndowmentProposal = Pick<
  InitReg,
  "PK" | "RegistrationDate" | "RegistrationStatus"
> &
  OrgData &
  TDocumentation & {
    OrganizationName_ContactEmail: string;
    poll_id: number;
  };

export type SubmitResult = {
  RegistrationStatus: RegistrationStatus;
  chain_id: string;
  poll_id: number;
};
