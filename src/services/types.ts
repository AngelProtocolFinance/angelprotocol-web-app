import { SuccessLink } from "slices/transaction/types";
import {
  ContactRoles,
  FileObject,
  ReferralMethods,
  RegistrationStatus,
  Token,
} from "types/aws";
import {
  AdminVoteInfo,
  CW3Config,
  EndowmentDetails,
  Proposal,
} from "types/contracts";
import { Optional } from "types/utils";

export type ContractQueryArgs<T = object> = {
  address: string;
  msg: T;
};

export type MultiContractQueryArgs = ContractQueryArgs<AggregatedQuery>;
export type AggregatedQuery = {
  aggregate: { queries: EncodedQueryMember[] };
};
export type EncodedQueryMember = {
  address: string;
  data: string; //base64 encoded msg
};

export type AdminRoles = "ap" | "reviewer" | "charity";
export type AdminResources = {
  cw3: string;
  cw4: string;
  endowmentId: number;
  endowment: EndowmentDetails;
  cw3config: CW3Config;
  role: AdminRoles;
  successLink: SuccessLink;
  successMessage: string;
};

export type ProposalDetails = Proposal & {
  votes: AdminVoteInfo[];
};

export type JunoTags =
  | "gov"
  | "indexfund"
  | "admin"
  | "account"
  | "registrar"
  | "custom";

export type Country = {
  flags: { png?: string; svg?: string };
  name: {
    common: string;
  };
};

export type CountryOption = {
  name: string;
  flag: string;
};

/** multicall */
export type WithBalance<T = Token> = T & { balance: number };

/** registration */
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
  //level 1 - should nest?
  proofOfIdentity: FileObject[];
  proofOfRegistration: FileObject[];
  website: string;
  sdg: number;

  //level 2
  financialStatements: FileObject[];

  //level3
  auditedFinancialReports: FileObject[];

  //so user won't click again on resume
  hasAuthority: boolean;
  hasAgreedToTerms: boolean;
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
  profile: Profile;
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

type Step3Data = Optional<
  Pick<CompleteRegistration, "init" | "contact" | "documentation" | "profile">,
  "profile"
>;
type Step4Data = Optional<CompleteRegistration, "wallet">;

export type RegistrationData = Step1Data | Step2Data | Step3Data | Step4Data;

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
  data: Step4Data;
};

type RegStep5 = {
  step: 5;
  data: CompleteRegistration & { status: RegistrationStatus };
};

export type RegistrationState =
  | RegStep1
  | RegStep2
  | RegStep3
  | RegStep4
  | RegStep5;

export type RegStep = RegistrationState["step"];
