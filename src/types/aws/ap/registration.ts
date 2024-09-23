import type { Except } from "type-fest";
import type { UNSDG_NUMS } from "types/lists";
import type { EndowDesignation } from ".";
import type { FileObject } from "../common";

export type RegistrationStatus =
  | "Inactive"
  | "Under Review"
  | "Active"
  | "Rejected";

type BankVerificationStatus = "Not Submitted" | "Under Review";

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

export type EndowClaim = {
  id: number;
  name: string;
  ein: string;
};

type InitReg = {
  PK: string;
  SK: "Registration";
  RegistrationDate: string /** ISO string*/;
  RegistrationStatus: RegistrationStatus;
  RejectionReason: string;
  UN_SDG: UNSDG_NUMS[];
  bank_verification_status: BankVerificationStatus;
  InitClaim?: EndowClaim;
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
  Claim?: EndowClaim | null;
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

type DoneContact = Append<InitApplication, OrgDataForStep1, ContactDetails>;
export type DoneOrgDetails = Append<DoneContact, OrgDetails, {}>;

export type DoneFSAInquiry = Append<DoneOrgDetails, FSAInquiry, {}>;

export type DoneDocs = Append<DoneFSAInquiry, TDocumentation, {}>;

export type DoneBanking = Append<DoneDocs, BankingDetails, {}>;

type SubmissionDetails = { Email: string; EndowmentId?: number };

type InReview = Append<DoneBanking, SubmissionDetails, {}>;

export type Application = InReview["Registration"] & Pick<InitContact, "Email">;

type WiseRecipient = {
  accountName: string;
  accountNumber: string;
  address: string;
  bankName: string;
};

export type ApplicationDetails = InReview & { WiseRecipient?: WiseRecipient };

//could be futher simplified to just {verdict: "approved" | string}
export type ApplicationVerdict = { PK: string } & (
  | { verdict: "approved" }
  | { verdict: "rejected"; rejectionReason: string }
);

export namespace RegV2 {
  namespace Update {
    export interface Contact extends RegV2.Contact {
      type: "contact";
    }
    export interface Org extends Omit<RegV2.Org, "hubspot_company_id"> {
      type: "org";
    }
    export interface FsaInq extends RegV2.FsaInq {
      type: "fsa-inq";
    }
    export interface Docs
      extends Omit<RegV2.TaxDeductibleDocs, "outdated" | "claim"> {
      type: "docs";
    }
    export interface Banking extends RegV2.Banking {
      type: "banking";
    }
  }

  export type Update = (
    | Update.Contact
    | Update.Org
    | Update.FsaInq
    | Update.Docs
    | Update.Banking
  ) & { id: string };
}

export const isIrs501c3 = (docs: RegV2.Docs): docs is RegV2.TaxDeductibleDocs =>
  "ein" in docs;

// type guards
class StepChecker {
  contact = (data: RegV2.Record): data is RegV2.Step1 => "contact" in data;
  org = (data: RegV2.Record): data is RegV2.Step2 =>
    "org" in data && this.contact(data);
  fsaInq = (data: RegV2.Record): data is RegV2.Step3 =>
    "irs501c3" in data && this.org(data);
  docs = (data: RegV2.Record): data is RegV2.Step4 =>
    "docs" in data && this.fsaInq(data) && !data.docs.outdated;
  banking = (data: RegV2.Record): data is RegV2.Step5 =>
    "banking" in data &&
    this.docs(data) &&
    ("ein" in data.docs
      ? true
      : //check if FSA docs are complete
        !!data.docs.fsa_signed_doc_url && !!data.docs.fsa_signing_url);

  submission = (data: RegV2.Record): data is RegV2.Step6 =>
    "submission" in data && this.banking(data);
}

export const isDone = new StepChecker();
