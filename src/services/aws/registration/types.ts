import {
  ContactDetails,
  DoneContact,
  DoneDocs,
  DoneProfile,
  DoneWallet,
  InitContact,
  SavedRegistration,
  TDocumentation,
  Profile as TProfile,
  WalletData,
} from "./regtypes";
import { FileObject, RegistrationStatus } from "types/aws";
import { Optional } from "types/utils";

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
  role: string;
  otherRole: string;

  referralMethod: string;
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
  annualReports: FileObject[];

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

//STEP 5
type EndowmentDetails = {
  id: string;
};

export type CompleteRegistration = {
  init: InitReg;
  contact: ContactPerson;
  documentation: Documentation;
  profile: Profile;
  wallet: WalletDetails;
};

/**
 * Step 1
 * user initiated, and confirmed email registration
 * RegistrationData {
 *   id: {ref, email, isEmailVerified:true}
 *   contact: something | undefined - if something, user can skip to next step
 * }
 */

type Step1Data = Optional<
  Pick<CompleteRegistration, "init" | "contact">,
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
  Pick<CompleteRegistration, "init" | "contact" | "documentation">,
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
  Pick<CompleteRegistration, "init" | "contact" | "documentation" | "profile">,
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
  data: Step3Data & { level: number };
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

export function getRegistrationState(
  reg: SavedRegistration
): RegistrationState {
  if (isDoneWallet(reg)) {
    const { ContactPerson: c, Registration: r, Metadata: m } = reg;
    return {
      step: 5,
      data: {
        init: getInit(c),
        contact: formatContactPerson(c, r),
        documentation: formatDocumentation(r),
        profile: formatProfile(m),
        wallet: { address: m.JunoWallet },
        status: r.RegistrationStatus,
      },
    };
  } else if (isDoneProfile(reg)) {
    const { ContactPerson: c, Registration: r, Metadata: m } = reg;
    return {
      step: 4,
      data: {
        init: getInit(c),
        contact: formatContactPerson(c, r),
        documentation: formatDocumentation(r),
        profile: formatProfile(m),
      },
    };
  } else if (isDoneDocs(reg)) {
    const { ContactPerson: c, Registration: r } = reg;
    return {
      step: 3,
      data: {
        init: getInit(c),
        contact: formatContactPerson(c, r),
        documentation: formatDocumentation(r),
        level: 1,
      },
    };
  } else if (isDoneContact(reg)) {
    const { ContactPerson: c, Registration: r } = reg;
    return {
      step: 2,
      data: {
        init: getInit(c),
        contact: formatContactPerson(c, r),
      },
    };
  } else {
    return {
      step: 1,
      data: {
        init: getInit(reg.ContactPerson),
      },
    };
  }
}

function getInit(i: InitContact): InitReg {
  return {
    email: i.Email,
    reference: i.PK,
    isEmailVerified: i.EmailVerified,
    lastVerified: i.EmailVerificationLastSentDate,
  };
}

function formatProfile(m: DoneProfile["Metadata"]): Profile {
  return {
    banner: m.Banner,
    logo: m.Logo,
    overview: m.Overview,
    isKYCRequired: m.KycDonorsOnly,
  };
}

function formatContactPerson(
  c: ContactDetails & InitContact,
  r: DoneContact["Registration"]
): ContactPerson {
  return {
    firstName: c.FirstName,
    lastName: c.LastName,
    phone: c.PhoneNumber,
    email: c.Email,
    orgName: r.OrganizationName,
    role: c.Role,
    otherRole: c.OtherRole,
    referralMethod: c.ReferralMethod,
    otherReferralMethod: c.OtherReferralMethod,
    goals: c.Goals,
  };
}

function formatDocumentation({
  ProofOfIdentity: poi,
  ProofOfRegistration: por,
  FinancialStatements: fs,
  AuditedFinancialReports: ar,
  Website,
  UN_SDG,
}: DoneDocs["Registration"]): Documentation {
  return {
    //level 1
    proofOfIdentity: [poi],
    proofOfRegistration: [por],
    website: Website,
    sdg: UN_SDG,

    //level 2
    financialStatements: fs || [],

    //level 3
    annualReports: ar || [],

    //meta
    hasAuthority: true,
    hasAgreedToTerms: true,
  };
}

function isDoneWallet(data: SavedRegistration): data is DoneWallet {
  const key: keyof WalletData = "JunoWallet";
  return key in data.Metadata;
}

function isDoneProfile(data: SavedRegistration): data is DoneProfile {
  const key: keyof TProfile = "Logo";
  return key in data.Metadata;
}

function isDoneDocs(data: SavedRegistration): data is DoneDocs {
  const key: keyof TDocumentation = "ProofOfIdentity";
  return key in data.Registration;
}

function isDoneContact(data: SavedRegistration): data is DoneContact {
  const key: keyof ContactDetails = "FirstName";
  return key in data.ContactPerson;
}
