import { InitReg, RegistrationState } from "../types";
import {
  BankingDetails,
  DoneBanking,
  DoneDocs,
  DoneFSAInquiry,
  DoneOrgDetails,
  FSAInquiry,
  InitContact,
  OrgDetails,
  SavedRegistration,
  TDocumentation,
  isDoneBanking,
  isDoneContact,
  isDoneDocs,
  isDoneFSAInquiry,
  isDoneOrgDetails,
} from "types/aws";

export function getRegistrationState(
  reg: SavedRegistration
): RegistrationState {
  if (isDoneBanking(reg)) {
    const { ContactPerson: c, Registration: r } = reg;
    return {
      step: 5,
      data: {
        init: initReg(c),
        contact: { ...c, orgName: r.OrganizationName },
        orgDetails: orgDetails(r),
        fsaInquiry: fsaInquiry(r),
        documentation: docs(r),
        banking: bankDetails(r),
      },
    };
  }

  if (isDoneDocs(reg)) {
    const { ContactPerson: c, Registration: r } = reg;
    return {
      step: 4,
      data: {
        init: initReg(c),
        contact: { ...c, orgName: r.OrganizationName },
        orgDetails: orgDetails(r),
        fsaInquiry: fsaInquiry(r),
        documentation: docs(r),
      },
    };
  }

  if (isDoneFSAInquiry(reg)) {
    const { ContactPerson: c, Registration: r } = reg;
    return {
      step: 3,
      data: {
        init: initReg(c),
        contact: { ...c, orgName: r.OrganizationName },
        orgDetails: orgDetails(r),
        fsaInquiry: fsaInquiry(r),
      },
    };
  }
  if (isDoneOrgDetails(reg)) {
    const { ContactPerson: c, Registration: r } = reg;
    return {
      step: 2,
      data: {
        init: initReg(c),
        contact: { ...c, orgName: r.OrganizationName },
        orgDetails: orgDetails(r),
      },
    };
  }

  if (isDoneContact(reg)) {
    const { ContactPerson: c, Registration: r } = reg;
    return {
      step: 1,
      data: {
        init: initReg(c),
        contact: { ...c, orgName: r.OrganizationName },
      },
    };
  }

  const { ContactPerson: c } = reg;
  return {
    step: 1,
    data: {
      init: initReg(c),
    },
  };
}

function initReg(i: InitContact): InitReg {
  return {
    email: i.Email,
    reference: i.PK,
  };
}
function orgDetails(reg: DoneOrgDetails["Registration"]): OrgDetails {
  return {
    Website: reg.Website,
    HqCountry: reg.HqCountry,
    ActiveInCountries: reg.ActiveInCountries,
    EndowDesignation: reg.EndowDesignation,
    KycDonorsOnly: reg.KycDonorsOnly,
    UN_SDG: reg.UN_SDG,
  };
}

function docs(reg: DoneDocs["Registration"]): TDocumentation {
  if (reg.DocType === "Non-FSA") {
    return { EIN: reg.EIN, DocType: reg.DocType };
  }
  return {
    DocType: reg.DocType,
    ProofOfIdentity: reg.ProofOfIdentity,
    RegistrationNumber: reg.RegistrationNumber,
    ProofOfRegistration: reg.ProofOfRegistration,
    LegalEntityType: reg.LegalEntityType,
    ProjectDescription: reg.ProjectDescription,
    FiscalSponsorshipAgreementSigningURL:
      reg.FiscalSponsorshipAgreementSigningURL,
    SignedFiscalSponsorshipAgreement: reg.SignedFiscalSponsorshipAgreement,
  };
}

function bankDetails(reg: DoneBanking["Registration"]): BankingDetails {
  return {
    BankStatement: reg.BankStatement,
    wise_recipient_id: reg.wise_recipient_id,
  };
}

function fsaInquiry(reg: DoneFSAInquiry["Registration"]): FSAInquiry {
  return {
    AuthorizedToReceiveTaxDeductibleDonations:
      reg.AuthorizedToReceiveTaxDeductibleDonations,
  };
}
