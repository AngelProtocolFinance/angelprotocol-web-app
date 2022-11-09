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

type RegistrationState = {
  step1: { data: Step1Data; nav: [] };
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
};

function getData<T extends keyof RegistrationState>() {}

/**
 * register/steps receives RegistrationState
 *
 */
