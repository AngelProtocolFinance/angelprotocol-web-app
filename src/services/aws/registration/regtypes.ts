import { ContactRoles, FileObject, ReferralMethods } from "types/aws";
import { EndowmentTierNum } from "types/contracts";

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

export type Profile = {
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
  Metadata: InitMeta & Profile;
};

export type DoneWallet = {
  Registration: InitReg & OrgData & TDocumentation;
  ContactPerson: InitContact & ContactDetails;
  Metadata: InitMeta & Profile & WalletData;
};

export type SavedRegistration =
  | InitApplication
  | DoneContact
  | DoneDocs
  | DoneProfile
  | DoneWallet;

type ContactUpdate = {
  type: "contact";
  ContactPerson: Pick<InitContact, "Email"> & Partial<ContactDetails>;
  Registration: OrgData;
};

type DocsUpdate = {
  type: "docs";
} & Omit<TDocumentation, "Tier"> &
  Partial<Pick<InitReg, "UN_SDG">>;

type ProfileUpdate = {
  type: "profile";
} & Pick<Profile, "Logo"> &
  Partial<Omit<Profile, "Logo">>;

type WalletUpdate = {
  type: "wallet";
} & WalletData;

export type RegistrationUpdate =
  | ContactUpdate
  | DocsUpdate
  | ProfileUpdate
  | WalletUpdate;

/**
 * param: uuid
 *
 * Update payloads
 * contact : ContactPerson.Email +
 * docs : Website, ProofOfIdentity, ProofOfRegistration
 * profile : Logo
 *
 */
