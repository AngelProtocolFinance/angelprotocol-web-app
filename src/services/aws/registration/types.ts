import { FileObject, UnprocessedApplication } from "types/aws";
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
  firstName: string;
  lastName: string;
  //https://www.npmjs.com/package/react-phone-input-2
  phone: string; // {format: string, value:string}
  // disabled, can't be changed once confirmed
  email: string;

  orgName: string;
  orgRole: string;

  referralMethod: string;
  goal: string;
};

//STEP 2
type Documentation = {
  //level 1 - should nest?
  proofOfIdentity: Asset;
  proofOfRegistration: Asset;
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

/**
 * user may or may not have initiated
 */
type Step0Data = Partial<Pick<CompleteRegistration, "id">>;

/**
 * Step 1
 * user initiated, and confirmed email registration
 * RegistrationData {
 *   id: {ref, email, isEmailVerified:true}
 *   contact: something | undefined - if something, user can skip to next step
 * }
 */

type Step1Data = Optional<
  Pick<CompleteRegistration, "id" | "contact">,
  "contact"
>;

/**
 * Step 2
 * user completed up to contact details form
 * RegistrationData {
 *   id: {ref, email, isEmailVerified:true}
 *   contact: something,
 *   documentation: something | undefined - if something, user can skip to next step
 * }
 */
type Step2Data = Optional<
  Pick<CompleteRegistration, "id" | "contact" | "documentation">,
  "documentation"
>;

/**
 * Step 3
 * user completed up to documentation
 * RegistrationData {
 *   id: {ref, email, isEmailVerified:true}
 *   contact: something,
 *   documentation: something
 *   profile: something | undefined - if something, user can skip to next step
 * }
 */

type Step3Data = Optional<
  Pick<CompleteRegistration, "id" | "contact" | "documentation" | "profile">,
  "profile"
>;

/**
 * Step 3
 * user completed up to profile
 * RegistrationData {
 *   id: {ref, email, isEmailVerified:true}
 *   contact: something,
 *   documentation: something
 *   profile: something
 *   wallet: something | undefined - if something, user can submit application
 * }
 */

type Step4Data = Optional<CompleteRegistration, "wallet">;

export type RegistrationData =
  | Step0Data
  | Step1Data
  | Step2Data
  | Step3Data
  | Step4Data;

type Nav = {
  back: string;
  next?: string; //set when data is available
};

type RegStep0 = {
  step: 0;
  data: RegistrationID;
};

type RegStep1 = {
  step: 1;
  data: Step1Data;
  nav: {
    back?: never;
    next?: string;
  };
};

type RegStep2 = {
  step: 2;
  data: Step2Data;
  nav: Nav;
};

type RegStep3 = {
  step: 3;
  data: Step3Data;
  nav: Nav;
};

type RegStep4 = {
  step: 4;
  data: Step4Data;
  nav: Nav;
};

export type RegistrationState =
  | RegStep0
  | RegStep1
  | RegStep2
  | RegStep3
  | RegStep4;

type RegStep = RegistrationState["step"];

/**
 * register/steps receives RegistrationState
 * name: {
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
 *
 */

function getRegistrationState({
  ContactPerson: c,
  Registration: r,
  Metadata: m,
}: UnprocessedApplication): any {
  if (c && c.PK && r && m) {
    const { Email, PK } = c;
    return {
      step: 4,
      data: {
        id: { email: Email, reference: PK },
        contact: formatContactPerson(c, r),
        documentation: {} as any,
        wallet: undefined,
        profile: {} as any,
      },
      nav: { back: "", next: "" },
    };
  } else if (c && r) {
  }
}

type UCP = UnprocessedApplication["ContactPerson"];
type UREG = UnprocessedApplication["Registration"];
type UMETA = UnprocessedApplication["Metadata"];

function formatContactPerson(cp: UCP, reg: UREG): ContactPerson {
  return {
    firstName: cp.FirstName,
    lastName: cp.LastName,
    phone: cp.PhoneNumber,
    email: cp.Email,
    orgName: reg.OrganizationName,
    orgRole: cp.Role,
    goal: cp.Goals,
    referralMethod: cp.ReferralMethod,
  };
}

/**
 * 
 * proofOfIdentity: Asset;
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
 */

function formatDocumentation(reg: UREG, meta: UMETA): any {
  const {
    ProofOfIdentity: poi,
    ProofOfRegistration: por,
    FinancialStatements: fs,
    AuditedFinancialReports: ar,
    Website,
  } = reg;

  return {
    //level 1
    proofOfIdentity: genFileAsset(poi ? [poi] : []),
    proofOfRegistration: genFileAsset(por ? [por] : []),
    website: Website ?? "",
    sdgs: [reg.UN_SDG],

    //level 2
    financialStatements: genFileAsset(fs || []),

    //level 3
    annualReports: genFileAsset(ar || []),
    isKYcRequired: meta.KycDonorsOnly,

    //meta
    hasAuthority: true,
    hasAgreedToTerms: true,
  };
}

function genFileAsset(previews: FileObject[]): Asset {
  return { files: [], previews };
}
