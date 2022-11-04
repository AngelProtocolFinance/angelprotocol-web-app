import { FileObject } from "files-from-path";
import { Optional } from "types/utils";
import { ImgLink } from "components/ImgEditor";

type FileLink = FileObject & { file: File | null };

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
  proofOfIdentity: FileLink[];
  website: string;
  sdgs: number[];

  //level 2
  financialStatements: FileLink[];

  //level3
  annualReports: FileLink[];
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

type ApplicantStep = Optional<
  CompleteRegistration,
  "contact" | "documentation" | "profile" | "wallet"
>;

type DocStep = Optional<
  CompleteRegistration,
  "documentation" | "profile" | "wallet"
>;

type ProfileStep = Optional<CompleteRegistration, "profile" | "wallet">;

type WalletStep = Optional<CompleteRegistration, "wallet">;
