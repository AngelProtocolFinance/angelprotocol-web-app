import { Optional } from "types/utils";
import { Asset } from "components/FileDropzone";
import { ImgLink } from "components/ImgEditor";

//REF_ID is global to registration
type RegistrationID = {
  reference: string;
  email: string;
};

//STEP 1

type ContactPerson = {
  name: {
    first: string;
    last: string;
  };
  //https://www.npmjs.com/package/react-phone-input-2
  phone: string; // {format: string, value:string}
  // disabled, can't be changed once confirmed
  email: string;

  organization: {
    name: string;
    role: string;
    otherRole: string;
    goal: string;
    referror: string;
  };

  referror: string; //referral method
};

//STEP 2
type Documentation = {
  //level 1 - should nest?
  proofOfIdentity: Asset;
  website: string;
  sdgs: number[];

  //level 2
  financialStatements: Asset;

  //level3
  annualReports: Asset;
  isKYCRequired: boolean;

  //so user won't click again on resume
  hasAuthority: boolean;
  hasAgreedToTerms: boolean;
};

//STEP 3
type Profile = {
  banner: ImgLink;
  logo: ImgLink;
  overview: string;
};

//STEP 4
type WalletDetails = {
  //keplr only
  address: string;
};

//STEP 5
type EndowmentDetails = {
  id: string;
};

export type CompleteRegistration = {
  id: RegistrationID;
  contact: ContactPerson;
  documentation: Documentation;
  profile: Profile;
  wallet: WalletDetails;
};

type Step1Data = Optional<
  CompleteRegistration,
  "contact" | "documentation" | "profile" | "wallet"
>;

type Step2Data = Optional<
  CompleteRegistration,
  "documentation" | "profile" | "wallet"
>;

type Step3Data = Optional<CompleteRegistration, "profile" | "wallet">;
type Step4Data = Optional<CompleteRegistration, "wallet">;

export type RegistrationData = Step1Data | Step2Data | Step3Data | Step4Data;

type Nav = {
  back: string;
  next?: string; //set when data is available
};

type RegStep1 = {
  step: 1;
  data: Step1Data;
  nav: {};
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

export type RegistrationState = RegStep1 | RegStep2 | RegStep3 | RegStep4;

type RegStep = RegistrationState["step"];

/**
 * register/steps receives RegistrationState
 *
 */
