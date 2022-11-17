import {
  ContactPerson,
  Documentation,
  InitReg,
  Profile,
  RegistrationState,
} from "../../types";
import {
  ContactDetails,
  DoneContact,
  DoneDocs,
  DoneProfile,
  DoneWallet,
  InitContact,
  RegProfile,
  SavedRegistration,
  TDocumentation,
  WalletData,
} from "types/aws";

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
        endowId: m.EndowmentId,
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
    auditedFinancialReports: ar || [],

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
  const key: keyof RegProfile = "Logo";
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
