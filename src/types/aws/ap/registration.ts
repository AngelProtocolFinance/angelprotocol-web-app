import { FileObject } from "../common";
import { EndowDesignation } from "../index";

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

export type InitReg = {
  uuid: string;
  registrationDate: string /** ISO string*/;
  registrantEmail: string;
  registrantName: string;
};

export type RegistrationMeta = {
  referralMethod: ReferralMethods;
  referralCode: string; //when ReferralMethod is "referral"
  otherReferralMethod: string; //when ReferralMethod is "other"
};

export type RegistrantDetails = {
  orgRole: ContactRoles;
  otherOrgRole: string;
  registrantPhoneNumber: string;
  registrantGoals: string;
  registrantRole: ContactRoles;
};

export type OrgDetails = {
  orgName: string;
  orgDesignation: EndowDesignation;
  orgHQCountry: string;
  orgCountriesOfOperation: string[];
  orgTagline: string;
};

export type OrgDocs =
  | {
      type: "US";
      EIN: string;
    }
  | {
      type: "Non-US";
      orgRegistrationNumber: string;
      orgLegalEntityType: string;
      orgProofOfRegistration: FileObject;
    };

export type BankDetails = {
  recipienctAccountID: string;
};

type FiscalSponsorship =
  | { type: "US" }
  | { type: "Non-US"; FSASigningURL: string; signedFSAdownloadURL?: string };

export type SubmissionStatus = {
  status: RegistrationStatus;
};

export type DoneRegistrantDetails = InitReg &
  RegistrationMeta &
  RegistrantDetails;
export type DoneOrgDetails = DoneRegistrantDetails & OrgDetails;
export type DoneOrgDocs = DoneOrgDetails & OrgDocs;
export type DoneBankDetails = DoneOrgDocs & BankDetails;
export type ForSubmission = DoneBankDetails & FiscalSponsorship;
export type Submitted = ForSubmission & SubmissionStatus;

export type SavedRegistration =
  | DoneRegistrantDetails
  | DoneOrgDetails
  | DoneOrgDocs
  | DoneBankDetails
  | ForSubmission
  | SubmissionStatus;

export type RegistrationUpdate = Pick<InitReg, "uuid"> & Partial<Submitted>;
