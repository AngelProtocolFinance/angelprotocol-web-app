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
  proofOfIdentity: FileObject[];
  proofOfRegistration: FileObject[];
  website: string;
  sdgs: number[];

  //level 2
  financialStatements: FileObject[];

  //level3
  annualReports: FileObject[];
  isKYCRequired: boolean;

  //so user won't click again on resume
  hasAuthority: boolean;
  hasAgreedToTerms: boolean;
};

//STEP 3
type Profile = {
  banner: FileObject;
  logo: FileObject;
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
  data: Step3Data;
  nav: Nav;
};

type RegStep4 = {
  step: 4;
  data: Step4Data;
  nav: Omit<Nav, "next">;
};

export type RegistrationState =
  | RegStep0
  | RegStep1
  | RegStep2
  | RegStep3
  | RegStep4;

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
    !!m.Overview
  ) {
    return {
      step: 4,
      data: {
        id: { email: c.Email, reference: c.PK },
        contact: formatContactPerson(c, r.OrganizationName),
        documentation: formatDocumentation(r, m.KycDonorsOnly),
        profile: { banner: m.Banner, logo: m.Logo, overview: m.Overview },
        wallet: m.JunoWallet ? { address: m.JunoWallet! } : undefined,
      },
      nav: { back: "" },
    };
  } else if (
    c &&
    c.PK &&
    r &&
    r.ProofOfIdentity && //no need to check for other fields
    m &&
    m.KycDonorsOnly !== undefined
  ) {
    const isComplete = !!m.Banner && !!m.Logo && !!m.Overview;
    return {
      step: 3,
      data: {
        id: { email: c.Email, reference: c.PK },
        contact: formatContactPerson(c, r.OrganizationName),
        documentation: formatDocumentation(r, m.KycDonorsOnly),
        profile:
          //must be defined altogether, can't initially set just one
          isComplete
            ? //asserted by isComplete, can be inlined, but need to reuse value
              { banner: m.Banner!, logo: m.Logo!, overview: m.Overview! }
            : undefined,
      },
      nav: { next: isComplete ? "" : undefined, back: "" },
    };
  } else if (
    c &&
    c.PK &&
    c.FirstName &&
    c.LastName /**... no need to check for other fields */
  ) {
    const isComplete =
      r && r.ProofOfIdentity && m && m.KycDonorsOnly !== undefined;

    return {
      step: 2,
      data: {
        id: { email: c.Email, reference: c.PK },
        contact: formatContactPerson(c, r.OrganizationName),
        documentation: isComplete
          ? formatDocumentation(r!, m.KycDonorsOnly!)
          : undefined,
      },
      nav: { next: isComplete ? "" : undefined, back: "" },
    };
  } else if (c && c.PK) {
    const isComplete =
      c.FirstName && c.LastName; /**... no need to check for other fields */
    return {
      step: 1,
      data: {
        id: { email: c.Email, reference: c.PK },
        contact: isComplete
          ? formatContactPerson(c, r.OrganizationName)
          : undefined,
      },
      nav: { next: isComplete ? "" : undefined },
    };
  } else {
    return { step: 0 };
  }
}

type UCP = UnprocessedApplication["ContactPerson"];
type UREG = UnprocessedApplication["Registration"];
type UMETA = UnprocessedApplication["Metadata"];

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

function formatDocumentation(reg: UREG, isKYCRequired: boolean): Documentation {
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
    sdgs: [reg.UN_SDG],

    //level 2
    financialStatements: fs || [],

    //level 3
    annualReports: ar || [],
    isKYCRequired,

    //meta
    hasAuthority: true,
    hasAgreedToTerms: true,
  };
}

function genFileAsset(previews: FileObject[]): Asset {
  return { files: [], previews };
}
