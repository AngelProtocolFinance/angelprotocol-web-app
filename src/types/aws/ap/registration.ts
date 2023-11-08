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

type RegistrationMeta = {
  orgRole: ContactRoles;
  referralMethod: ReferralMethods;
  referralCode: string; //when ReferralMethod is "referral"
  otherReferralCode: string; //when ReferralMethod is "other"
};

type RegistrantDetails = {
  registrantPhoneNumber: string;
  registrantGoals: string;
  registrantRole: ContactRoles;
  registrantOtherRole: string;
};

type OrgDetails = {
  orgName: string;
  orgDesignation: EndowDesignation;
  orgHQCountry: string;
  orgCountriesOfOperation: string[];
  orgTagline: string;
};

type OrgDocs =
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

type BankDetails = {
  recipienctAccountID: string;
};

type FiscalSponsorship =
  | { type: "US" }
  | { type: "Non-US"; FSASigningURL: string; signedFSAdownloadURL?: string };

//use generic step name
export type DoneRegistrantDetails = InitReg &
  RegistrationMeta &
  RegistrantDetails;
export type DoneOrgDetails = DoneRegistrantDetails & OrgDetails;
export type DoneOrgDocs = DoneOrgDetails & OrgDocs;
export type DoneBankDetails = DoneOrgDocs & BankDetails;
export type Complete = DoneBankDetails & FiscalSponsorship;

export type SavedRegistration =
  | DoneRegistrantDetails
  | DoneOrgDetails
  | DoneOrgDocs
  | DoneBankDetails
  | Complete;

export type RegistrationUpdate = Pick<InitReg, "uuid"> & Partial<Complete>;
