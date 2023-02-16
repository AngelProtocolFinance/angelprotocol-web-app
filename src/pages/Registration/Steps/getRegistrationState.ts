import {
  ContactPerson,
  Documentation,
  InitReg,
  RegistrationState,
} from "../types";
import {
  ContactDetails,
  DoneContact,
  DoneDocs,
  DoneWallet,
  FileObject,
  InitContact,
  SavedRegistration,
  TDocumentation,
  WalletData,
} from "types/aws";
import { Asset } from "components/registration";
import { unsdgs } from "constants/unsdgs";

export function getRegistrationState(
  reg: SavedRegistration
): RegistrationState {
  if (isDoneWallet(reg)) {
    const { ContactPerson: c, Registration: r, Metadata: m } = reg;
    return {
      step: 4,
      data: {
        init: getInit(c),
        contact: formatContactPerson(c, r),
        documentation: formatDocumentation(r),
        wallet: { address: m.JunoWallet },
        status: r.RegistrationStatus,
        endowId: m.EndowmentId,
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
  Tier,
  ProofOfIdentity: poi,
  ProofOfRegistration: por,
  FinancialStatements: fs,
  AuditedFinancialReports: afr,
  Website,
  UN_SDG,
  KycDonorsOnly,
  HqCountry,
  ActiveInCountries,
}: DoneDocs["Registration"]): Documentation {
  return {
    //level 1
    proofOfIdentity: genFileAsset([poi]),
    proofOfRegistration: genFileAsset([por]),
    website: Website,
    sdgs: UN_SDG.map((sdg) => ({
      value: sdg,
      label: `${sdg} - ${unsdgs[sdg].title}`,
    })),
    hqCountry: HqCountry,

    //level 2
    financialStatements: genFileAsset(fs || []),

    //level 3
    auditedFinancialReports: genFileAsset(afr || []),
    /**TODO: must be part of Registration not Metadata */
    isKYCRequired: KycDonorsOnly ? "Yes" : "No",

    //general
    activeInCountries: ActiveInCountries,

    //meta
    level: Tier,
    hasAuthority: true,
    hasAgreedToTerms: true,
  };
}

export function genFileAsset(previews: FileObject[]): Asset {
  return { files: [], previews };
}

function isDoneWallet(data: SavedRegistration): data is DoneWallet {
  const key: keyof WalletData = "JunoWallet";
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
