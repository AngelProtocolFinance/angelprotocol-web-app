import {
  FileObject,
  RegistrationStatus,
  UnprocessedApplication,
} from "types/aws";
import { Optional } from "types/utils";

//REF_ID is global to registration
export type InitReg = {
  reference: string;
  email: string;
  isEmailVerified?: boolean;
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
  orgRole: string;

  referralMethod: string;
  goal: string;
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

type Nav = { back: string; next?: string };

type RegStep0 = {
  step: 0;
};

type RegStep1 = {
  step: 1;
  data: Step1Data;
  nav: Omit<Nav, "back">;
};

type RegStep2 = {
  step: 2;
  data: Step2Data;
  nav: Nav;
};

type RegStep3 = {
  step: 3;
  data: Step3Data & { level: number };
  nav: Nav;
};

type RegStep4 = {
  step: 4;
  data: Step4Data;
  nav: Omit<Nav, "next">;
};

type RegStep5 = {
  step: 5;
  data: CompleteRegistration & { status: RegistrationStatus };
};

export type RegistrationState =
  | RegStep0
  | RegStep1
  | RegStep2
  | RegStep3
  | RegStep4
  | RegStep5;

export type RegStep = RegistrationState["step"];

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

export function getRegistrationState({
  ContactPerson: c,
  Registration: r,
  Metadata: m,
}: UnprocessedApplication): RegistrationState {
  if (
    /** TODO: this exhaustive checks can be avoided if each registration step doesn't get
     *  data from different keys in UnproccessApplications
     *  e.g Step4 should be considered finished if Application.Registration is defined, but we also need to check
     *  if it has ProofOfIdentity since Registration attr can be created by Step1 when saving OrgName
     */
    c &&
    c.PK &&
    r &&
    r.ProofOfIdentity && //no need to check for other fields
    m &&
    m.KycDonorsOnly !== undefined &&
    !!m.Banner &&
    !!m.Logo &&
    !!m.Overview &&
    !!m.JunoWallet
  ) {
    return {
      step: 5,
      data: {
        init: getInit(c),
        contact: formatContactPerson(c, r.OrganizationName),
        documentation: formatDocumentation(r),
        profile: {
          banner: m.Banner,
          logo: m.Logo,
          overview: m.Overview,
          isKYCRequired: m.KycDonorsOnly,
        },
        wallet: { address: m.JunoWallet! },
        status: r.RegistrationStatus,
      },
    };
  } else if (
    c &&
    c.PK &&
    r &&
    r.ProofOfIdentity && //no need to check for other fields
    m &&
    m.KycDonorsOnly !== undefined &&
    !!m.Banner &&
    !!m.Logo &&
    !!m.Overview
  ) {
    return {
      step: 4,
      data: {
        init: getInit(c),
        contact: formatContactPerson(c, r.OrganizationName),
        documentation: formatDocumentation(r),
        profile: {
          banner: m.Banner,
          logo: m.Logo,
          overview: m.Overview,
          isKYCRequired: m.KycDonorsOnly,
        },
        wallet: m.JunoWallet ? { address: m.JunoWallet! } : undefined,
      },
      nav: { back: "3" },
    };
  } else if (
    c &&
    c.PK &&
    r &&
    r.ProofOfIdentity //no need to check for other fields
  ) {
    const isComplete =
      m && !!m.Banner && !!m.Logo && !!m.Overview && !!m.KycDonorsOnly;
    return {
      step: 3,
      data: {
        init: getInit(c),
        contact: formatContactPerson(c, r.OrganizationName),
        documentation: formatDocumentation(r),
        profile:
          //must be defined altogether, can't initially set just one
          isComplete
            ? //asserted by isComplete, can be inlined, but need to reuse value
              {
                banner: m.Banner!,
                logo: m.Logo!,
                overview: m.Overview!,
                isKYCRequired: m.KycDonorsOnly!,
              }
            : undefined,
        level: 1,
      },
      nav: { next: isComplete ? "4" : undefined, back: "2" },
    };
  } else if (
    c &&
    c.PK &&
    c.FirstName &&
    c.LastName /**... no need to check for other fields */
  ) {
    const isComplete = r && r.ProofOfIdentity;

    return {
      step: 2,
      data: {
        init: getInit(c),
        contact: formatContactPerson(c, r.OrganizationName),
        documentation: isComplete ? formatDocumentation(r) : undefined,
      },
      nav: { next: isComplete ? "3" : undefined, back: "1" },
    };
  } else if (c && c.PK) {
    const isComplete =
      c.FirstName && c.LastName; /**... no need to check for other fields */
    console.log(c.FirstName, c.LastName);
    return {
      step: 1,
      data: {
        init: getInit(c),
        contact: isComplete
          ? formatContactPerson(c, r.OrganizationName)
          : undefined,
      },
      nav: { next: isComplete ? "2" : undefined },
    };
  } else {
    return { step: 0 };
  }
}

type UCP = UnprocessedApplication["ContactPerson"];
type UREG = UnprocessedApplication["Registration"];

function getInit(cp: UCP): InitReg {
  return {
    email: cp.Email,
    reference: cp.PK!,
    isEmailVerified: cp.EmailVerified,
  };
}

function formatContactPerson(cp: UCP, orgName: string): ContactPerson {
  return {
    firstName: cp.FirstName,
    lastName: cp.LastName,
    phone: cp.PhoneNumber,
    email: cp.Email,
    orgName,
    orgRole: cp.Role,
    goal: cp.Goals,
    referralMethod: cp.ReferralMethod,
  };
}

function formatDocumentation(reg: UREG): Documentation {
  const {
    ProofOfIdentity: poi,
    ProofOfRegistration: por,
    FinancialStatements: fs,
    AuditedFinancialReports: ar,
    Website,
  } = reg;

  return {
    //level 1
    proofOfIdentity: poi ? [poi] : [],
    proofOfRegistration: por ? [por] : [],
    website: Website ?? "",
    sdg: reg.UN_SDG,

    //level 2
    financialStatements: fs || [],

    //level 3
    annualReports: ar || [],

    //meta
    hasAuthority: true,
    hasAgreedToTerms: true,
  };
}
