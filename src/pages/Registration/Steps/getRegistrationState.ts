import {
  ContactPerson,
  Documentation,
  InitReg,
  RegistrationState,
} from "../types";
import {
  ContactDetails,
  DoneDocs,
  DoneStep1,
  FileObject,
  InitContact,
  SavedRegistration,
  TDocumentation,
} from "types/aws";
import { Asset } from "components/registration";
import { unsdgs } from "constants/unsdgs";

export function getRegistrationState(
  reg: SavedRegistration
): RegistrationState {
  if (isDoneDocs(reg)) {
    const { ContactPerson: c, Registration: r, Metadata: m } = reg;
    return {
      step: 3,
      data: {
        init: getInit(c),
        contact: formatContactPerson(c, r),
        documentation: formatDocumentation(r),
        status: r.RegistrationStatus,
        endowId: m.EndowmentId,
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
  };
}

function formatContactPerson(
  c: ContactDetails & InitContact,
  r: DoneStep1["Registration"]
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
    referralCode: c.ReferralCode,
    goals: c.Goals,
  };
}

function formatDocumentation({
  Tier,
  ProofOfIdentity: poi,
  ProofOfRegistration: por,
  Website,
  UN_SDG,
  KycDonorsOnly,
  HqCountry,
  EndowDesignation,
  ActiveInCountries,
  AuthorizedToReceiveTaxDeductibleDonations,
  FiscalSponsorshipAgreementSigningURL = "",
  SignedFiscalSponsorshipAgreement = "",
  EIN,
  LegalEntityType,
  ProjectDescription,
}: DoneDocs["Registration"]): Documentation {
  return {
    //level 1
    proofOfIdentity: genFileAsset([poi]),
    proofOfRegistration: genFileAsset([por]),
    ein: EIN,

    website: Website,
    sdgs: UN_SDG.map((sdg) => ({
      value: sdg,
      label: `${sdg} - ${unsdgs[sdg].title}`,
    })),
    hqCountry: { name: HqCountry, flag: "", code: "" },
    endowDesignation: { value: EndowDesignation, label: EndowDesignation },
    /**TODO: must be part of Registration not Metadata */

    //general
    activeInCountries: ActiveInCountries.map((c) => ({ label: c, value: c })),
    isAuthorizedToReceiveTaxDeductibleDonations:
      AuthorizedToReceiveTaxDeductibleDonations ? "Yes" : "No",
    fiscalSponsorshipAgreementSigningURL: FiscalSponsorshipAgreementSigningURL,
    signedFiscalSponsorshipAgreement: SignedFiscalSponsorshipAgreement,
    legalEntityType: LegalEntityType,
    projectDescription: ProjectDescription,

    //meta
    tier: Tier,
    isAnonymousDonationsAllowed: KycDonorsOnly ? "No" : "Yes",
  };
}

export function genFileAsset(previews: FileObject[]): Asset {
  return { files: [], previews };
}

function isDoneDocs(data: SavedRegistration): data is DoneDocs {
  const key: keyof TDocumentation = "ProofOfIdentity";
  return key in data.Registration;
}

function isDoneContact(data: SavedRegistration): data is DoneStep1 {
  const key: keyof ContactDetails = "FirstName";
  return key in data.ContactPerson;
}
