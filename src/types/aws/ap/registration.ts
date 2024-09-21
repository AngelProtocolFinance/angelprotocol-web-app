import type { Except } from "type-fest";
import type { APIEnvironment, UNSDG_NUMS } from "types/lists";
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
type ResetFSAInquiry = Append<DoneOrgDetails, Reset<FSAInquiry>, {}>;

export type DoneDocs = Append<DoneFSAInquiry, TDocumentation, {}>;
type ResetDocs = Append<DoneFSAInquiry, Reset<TDocumentation>, {}>;

export type DoneBanking = Append<DoneDocs, BankingDetails, {}>;

type SubmissionDetails = { Email: string; EndowmentId?: number };

type InReview = Append<DoneBanking, SubmissionDetails, {}>;

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

export type ApplicationDetails = InReview & { WiseRecipient?: WiseRecipient };

//could be futher simplified to just {verdict: "approved" | string}
export type ApplicationVerdict = { PK: string } & (
  | { verdict: "approved" }
  | { verdict: "rejected"; rejectionReason: string }
);

export namespace RegV2 {
  export interface Init {
    id: number;
    registrant_id: string;
    hubspot_contact_id?: string;
    created_at: string;
    env: APIEnvironment;
    claim?: EndowClaim;
  }

  export interface Contact {
    first_name: string;
    last_name: string;
    /** phone number */
    contact_email?: string;
    goals: string;
    org_name: string;
    org_role: ContactRoles;
    /** when `org_role` is `Other` */
    other_role?: string;
    referral_method: ReferralMethods;
    /** when `referral_method` is `Referral` */
    referral_code?: string;
    /** when `referral_method` is `Other` */
    other_referral_method?: string;
  }

  export interface Org {
    website: string;
    hq_country: string;
    active_in_countries?: string[];
    designation: EndowDesignation;
    kyc_donors_only: boolean;
    un_sdg: UNSDG_NUMS[];
    hubspot_company_id?: string;
  }

  export interface Docs {
    outdated: boolean;
  }
  export interface FsaDocs extends Docs {
    proof_of_identity: FileObject;
    registration_number: string;
    proof_of_reg: FileObject;
    legal_entity_type: string;
    project_description: string;
    fsa_signing_url?: string;
    fsa_signed_doc_url?: string;
  }
  export interface TaxDeductibleDocs extends Docs {
    ein: string;
    claim?: EndowClaim;
  }

  export interface Banking {
    bank_statement: FileObject;
    wise_recipient_id: number;
  }

  export type Submission = { endowment_id: number } | "in-review";

  export interface Step1 extends Init {
    contact: Contact;
  }
  export interface Step2 extends Step1 {
    org: Org;
  }
  export interface Step3 extends Step2 {
    irs501c3: boolean;
  }
  export interface Step4 extends Step3 {
    docs: FsaDocs | TaxDeductibleDocs;
  }

  export interface Step5 extends Omit<Step4, "docs"> {
    docs: Required<FsaDocs> | TaxDeductibleDocs;
    banking: Banking;
  }
  export interface Step6 extends Step5 {
    submission: Submission;
  }

  export type Record = Step1 | Step2 | Step3 | Step4 | Step5 | Step6;

  namespace Update {
    export interface Contact {
      type: "contact";
      val: Contact;
    }
    export interface Org {
      type: "org";
      val: Omit<RegV2.Org, "hubspot_company_id">;
    }
    export interface FsaInq {
      type: "fsa-inq";
      val: boolean;
    }
    export interface Docs {
      type: "docs";
      /** ein  */
      val: string;
    }
    export interface Banking {
      type: "banking";
      val: Banking;
    }
  }
  export type Update =
    | Update.Contact
    | Update.Org
    | Update.FsaInq
    | Update.Docs
    | Update.Banking;
}

export const isIrs501c3 = (docs: RegV2.Docs): docs is RegV2.TaxDeductibleDocs =>
  "ein" in docs;

// type guards
class StepChecker {
  step1 = (data: RegV2.Record): data is RegV2.Step1 => "contact" in data;
  step2 = (data: RegV2.Record): data is RegV2.Step2 =>
    "org" in data && this.step1(data);
  step3 = (data: RegV2.Record): data is RegV2.Step3 =>
    "irs501c3" in data && this.step2(data);
  step4 = (data: RegV2.Record): data is RegV2.Step4 =>
    "docs" in data && this.step3(data) && !data.docs.outdated;
  step5 = (data: RegV2.Record): data is RegV2.Step5 =>
    "banking" in data &&
    this.step4(data) &&
    ("ein" in data.docs
      ? true
      : //check if FSA docs are complete
        !!data.docs.fsa_signed_doc_url && !!data.docs.fsa_signing_url);

  step6 = (data: RegV2.Record): data is RegV2.Step6 =>
    "submission" in data && this.step5(data);
}

export const isDone = new StepChecker();
