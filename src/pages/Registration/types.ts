import {
  ContactRoles,
  FileObject,
  ReferralMethods,
  RegistrationStatus,
} from "types/aws";
import { EndowmentTierNum } from "types/contracts";
import { UNSDG_NUMS } from "types/lists";
import { Optional } from "types/utils";
import { Asset, OptionType } from "components/registration";

//REF_ID is global to registration
export type InitReg = {
  reference: string;
  email: string;
  isEmailVerified: boolean;
  lastVerified: string; // ISO string
};

//STEP 1
export type ContactPerson = {
  firstName: string;
  lastName: string;
  //https://www.npmjs.com/package/react-phone-input-2
  phone: string; // {format: string, value:string}
  // disabled, can't be changed once confirmed
  email: string;

  orgName: string;
  role: ContactRoles;
  otherRole: string;

  referralMethod: ReferralMethods;
  otherReferralMethod: string;
  goals: string;
};

//STEP 2
export type Documentation = {
  //level1
  proofOfIdentity: Asset;
  proofOfRegistration: Asset;
  website: string;
  sdgs: OptionType<UNSDG_NUMS>[];

  //level 2
  financialStatements: Asset;

  //level3
  auditedFinancialReports: Asset;
  isKYCRequired: "Yes" | "No";

  //so user won't click again on resume
  hasAuthority: boolean;
  hasAgreedToTerms: boolean;
  level: EndowmentTierNum;
};

//STEP 3
export type Profile = {
  banner: FileObject;
  logo: FileObject;
  overview: string;
  isKYCRequired: boolean;
};

//STEP 4
type WalletDetails = {
  //keplr only
  address: string;
};

export type CompleteRegistration = {
  init: InitReg;
  contact: ContactPerson;
  documentation: Documentation;
  wallet: WalletDetails;
  endowId?: number; //created
};

type Step1Data = Optional<
  Pick<CompleteRegistration, "init" | "contact">,
  "contact"
>;

type Step2Data = Optional<
  Pick<CompleteRegistration, "init" | "contact" | "documentation">,
  "documentation"
>;

type Step3Data = Optional<CompleteRegistration, "wallet">;

export type RegistrationData = Step1Data | Step2Data | Step3Data;

type RegStep1 = {
  step: 1;
  data: Step1Data;
};

type RegStep2 = {
  step: 2;
  data: Step2Data;
};

type RegStep3 = {
  step: 3;
  data: Step3Data;
};

type RegStep4 = {
  step: 4;
  data: CompleteRegistration & { status: RegistrationStatus };
};

export type RegistrationState = RegStep1 | RegStep2 | RegStep3 | RegStep4;

export type RegStep = RegistrationState["step"];
